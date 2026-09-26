using System.Globalization;
using ExpenseTracker.WinForms;
using Xunit;

namespace ExpenseTracker.Tests;

public class ExpenseValidationTests
{
    [Fact]
    public void ExpenseTotal_sums_amounts_and_returns_zero_for_no_expenses()
    {
        Assert.Equal(30.75m, ExpenseSummary.CalculateTotal(new[] { 12.50m, 18.25m }));
        Assert.Equal(0m, ExpenseSummary.CalculateTotal(Array.Empty<decimal>()));
    }

    [Fact]
    public void ExpenseAmount_format_uses_the_current_culture_currency()
    {
        var originalCulture = CultureInfo.CurrentCulture;
        try
        {
            var culture = CultureInfo.GetCultureInfo("en-US");
            CultureInfo.CurrentCulture = culture;

            var formatted = ExpenseSummary.FormatAmount(1234.5m);

            Assert.Contains(culture.NumberFormat.CurrencySymbol, formatted);
            Assert.Contains("1,234.50", formatted);
        }
        finally
        {
            CultureInfo.CurrentCulture = originalCulture;
        }
    }

    [Fact]
    public void TryParseAmount_accepts_positive_values_in_current_culture()
    {
        var originalCulture = CultureInfo.CurrentCulture;
        try
        {
            CultureInfo.CurrentCulture = CultureInfo.GetCultureInfo("en-US");
            Assert.True(ExpenseValidation.TryParseAmount("12.50", out var amount));
            Assert.Equal(12.50m, amount);
            Assert.True(ExpenseValidation.TryParseAmount("1,234.56", out amount));
            Assert.Equal(1234.56m, amount);
        }
        finally
        {
            CultureInfo.CurrentCulture = originalCulture;
        }
    }

    [Theory]
    [InlineData("")]
    [InlineData("0")]
    [InlineData("-1")]
    [InlineData("not-a-number")]
    [InlineData("1.239")]
    [InlineData("10000000000000000.00")]
    public void TryParseAmount_rejects_invalid_or_non_positive_values(string input)
    {
        Assert.False(ExpenseValidation.TryParseAmount(input, out _));
    }

    [Fact]
    public void CategoryName_rejects_names_longer_than_schema()
    {
        Assert.False(ExpenseValidation.IsValidCategoryName(new string('x', 201)));
    }

    [Theory]
    [InlineData("Food")]
    [InlineData("  Transport  ")]
    public void CategoryName_accepts_non_empty_names(string name)
    {
        Assert.True(ExpenseValidation.IsValidCategoryName(name));
    }
}
