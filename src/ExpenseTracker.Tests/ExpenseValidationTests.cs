using ExpenseTracker.WinForms;
using Xunit;

namespace ExpenseTracker.Tests;

public class ExpenseValidationTests
{
    [Theory]
    [InlineData("12.50")]
    [InlineData("1,234.56")]
    public void TryParseAmount_accepts_positive_current_culture_values(string input)
    {
        Assert.True(ExpenseValidation.TryParseAmount(input, out var amount));
        Assert.True(amount > 0);
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
