using System;
using System.IO;
using FlaUI.Core;
using FlaUI.Core.AutomationElements;
using FlaUI.Core.Input;
using FlaUI.Core.WindowsAPI;
using FlaUI.UIA3;
using NUnit.Framework;
using FlaUIApplication = FlaUI.Core.Application;

namespace ExpenseTracker.UiTests
{
    [TestFixture]
    public class MainWindowUiTests
    {
        [Test]
        public void App_launches_and_shows_a_main_window()
        {
            var repoRoot = Path.GetFullPath(Path.Combine(TestContext.CurrentContext.TestDirectory, "..", "..", "..", "..", ".."));
            var configuration = Environment.GetEnvironmentVariable("EXPENSE_TRACKER_CONFIGURATION");
            if (string.IsNullOrWhiteSpace(configuration))
            {
                configuration = "Debug";
            }
            var exe = ResolveAppPath(repoRoot, configuration);

            Assert.That(File.Exists(exe), Is.True, $"Exe not found at {exe}. Build the WinForms project before running UI tests.");

            using (var app = FlaUIApplication.Launch(exe))
            using (var automation = new UIA3Automation())
            {
                try
                {
                    var main = app.GetMainWindow(automation, TimeSpan.FromSeconds(20));
                    Assert.IsNotNull(main, "Main window should appear after app launch");
                    Assert.That(main!.Title, Is.EqualTo("Expense Tracker (WinForms)"));
                }
                finally
                {
                    app.Close(killIfCloseFails: true);
                }
            }
        }

        [Test]
        public void Expense_can_be_added_edited_cancelled_deleted_and_verified_after_restart()
            {
                var repoRoot = Path.GetFullPath(Path.Combine(TestContext.CurrentContext.TestDirectory, "..", "..", "..", "..", ".."));
                var configuration = Environment.GetEnvironmentVariable("EXPENSE_TRACKER_CONFIGURATION");
                if (string.IsNullOrWhiteSpace(configuration))
                {
                    configuration = "Debug";
                }

                var exe = ResolveAppPath(repoRoot, configuration);
                Assert.That(File.Exists(exe), Is.True, $"Exe not found at {exe}. Build the WinForms project before running UI tests.");

                var categoryName = "UiTest-" + Guid.NewGuid().ToString("N")[..8];
                var note = "UiExpense-" + Guid.NewGuid().ToString("N")[..8];
                var editedNote = note + "-edited";

                using (var app = FlaUIApplication.Launch(exe))
                using (var automation = new UIA3Automation())
                {
                    try
                    {
                        var main = app.GetMainWindow(automation, TimeSpan.FromSeconds(20));
                        Assert.That(main, Is.Not.Null, "Main window should appear before CRUD automation");

                        var categoryInput = Find(main!, "txtNewCategory").AsTextBox();
                        categoryInput.Enter(categoryName);
                        Find(main!, "btnAddCategory").AsButton().Invoke();

                        var categories = Find(main!, "lstCategories").AsListBox();
                        categories.Select(categoryName);
                        Find(main!, "txtAmount").AsTextBox().Enter("12.50");
                        Find(main!, "txtNote").AsTextBox().Enter(note);
                        Find(main!, "btnAddExpense").AsButton().Invoke();

                        var grid = Find(main!, "dgvExpenses").AsDataGridView();
                        var addedRow = FindRow(grid, note);
                        Assert.That(addedRow, Is.Not.Null, "The added expense should appear in the grid");
                        Assert.That(grid.Rows.Count, Is.EqualTo(2), "The grid should show one expense and one total row");

                        DoubleClickCell(FindNoteCell(addedRow!, note));
                        var amountInput = Find(main!, "txtAmount").AsTextBox();
                        var noteInput = Find(main!, "txtNote").AsTextBox();
                        amountInput.Text = "99.99";
                        noteInput.Text = note + "-cancelled";
                        main!.Focus();
                        Keyboard.Press(VirtualKeyShort.ESC);
                        Assert.That(Find(main!, "btnAddExpense").Name, Is.EqualTo("Add Expense"));
                        Assert.That(FindRow(grid, note), Is.Not.Null, "Escape should cancel edits without changing the saved row");
                        Assert.That(FindRow(grid, note + "-cancelled"), Is.Null);

                        DoubleClickCell(FindNoteCell(FindRow(grid, note)!, note));
                        amountInput.Text = "27.50";
                        noteInput.Text = editedNote;
                        Find(main!, "btnAddExpense").AsButton().Invoke();
                        var updatedRow = FindRow(grid, editedNote);
                        Assert.That(updatedRow, Is.Not.Null, "Saving edits should update the row shown in the grid");
                        Assert.That(FindRow(grid, note), Is.Null, "The old note should no longer be present after edit");
                        Assert.That(grid.Rows.Count, Is.EqualTo(2), "The displayed total should include the edited expense only once");

                        FindNoteCell(updatedRow!, editedNote).Click();
                        Find(main!, "btnDeleteExpense").AsButton().Invoke();
                        Assert.That(FindRow(grid, editedNote), Is.Null, "Deleting should remove the expense from the grid");
                        Assert.That(grid.Rows.Count, Is.EqualTo(1), "Deleting the only expense should leave the zero-total row");
                        Assert.That(FindRow(grid, "TOTAL"), Is.Not.Null, "The total row should remain visible when there are no expenses");
                    }
                    finally
                    {
                        app.Close(killIfCloseFails: true);
                    }
                }

                using (var restartedApp = FlaUIApplication.Launch(exe))
                using (var automation = new UIA3Automation())
                {
                    try
                    {
                        var main = restartedApp.GetMainWindow(automation, TimeSpan.FromSeconds(20));
                        Assert.That(main, Is.Not.Null, "The app should restart successfully");
                        Find(main!, "lstCategories").AsListBox().Select(categoryName);
                        var restartedGrid = Find(main!, "dgvExpenses").AsDataGridView();
                        Assert.That(FindRow(restartedGrid, "TOTAL"), Is.Not.Null, "The zero-total row should be shown after restarting an empty database");
                        Assert.That(FindRow(restartedGrid, editedNote), Is.Null, "Deleted data should remain deleted after restart");
                    }
                    finally
                    {
                        restartedApp.Close(killIfCloseFails: true);
                    }
                }
            }

        private static AutomationElement Find(AutomationElement root, string automationId)
            {
                var element = root.FindFirstDescendant(condition => condition.ByAutomationId(automationId));
                Assert.That(element, Is.Not.Null, $"Could not find UI element '{automationId}'.");
                return element!;
            }

            private static string ResolveAppPath(string repoRoot, string configuration)
            {
                var configuredPath = Environment.GetEnvironmentVariable("EXPENSE_TRACKER_APP_PATH");
                var path = string.IsNullOrWhiteSpace(configuredPath)
                    ? Path.Combine(repoRoot, "src", "ExpenseTracker.WinForms", "bin", configuration, "net10.0-windows", "ExpenseTracker.WinForms.exe")
                    : configuredPath;
                return Path.GetFullPath(path);
            }

        private static FlaUI.Core.AutomationElements.DataGridViewRow? FindRow(
            FlaUI.Core.AutomationElements.DataGridView grid,
            string text)
            {
                foreach (var row in grid.Rows)
                {
                    foreach (var cell in row.Cells)
                    {
                        if (string.Equals(cell.Value, text, StringComparison.Ordinal))
                        {
                            return row;
                        }
                    }
                }

                return null;
            }

        private static FlaUI.Core.AutomationElements.DataGridViewCell FindNoteCell(
            FlaUI.Core.AutomationElements.DataGridViewRow row,
            string note)
            {
                foreach (var cell in row.Cells)
                {
                    if (string.Equals(cell.Value, note, StringComparison.Ordinal))
                    {
                        return cell;
                    }
                }

                Assert.Fail($"Could not find the grid cell for note '{note}'.");
                throw new InvalidOperationException("Unreachable after assertion failure.");
            }

        private static void DoubleClickCell(FlaUI.Core.AutomationElements.DataGridViewCell cell)
        {
            var bounds = cell.BoundingRectangle;
            Mouse.DoubleClick(new System.Drawing.Point(
                bounds.Left + bounds.Width / 2,
                bounds.Top + bounds.Height / 2));
        }
    }
}
