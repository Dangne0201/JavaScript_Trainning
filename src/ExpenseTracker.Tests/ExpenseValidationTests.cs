using System.Globalization;
using ExpenseTracker.WinForms;
using Xunit;

namespace ExpenseTracker.Tests;

public class ExpenseValidationTests
{
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
