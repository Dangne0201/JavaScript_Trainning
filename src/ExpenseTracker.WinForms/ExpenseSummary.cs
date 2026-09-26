using System.Globalization;

namespace ExpenseTracker.WinForms;

public static class ExpenseSummary
{
    public static decimal CalculateTotal(IEnumerable<decimal> amounts)
    {
        ArgumentNullException.ThrowIfNull(amounts);
        return amounts.Sum();
    }

    public static string FormatAmount(decimal amount)
    {
        return amount.ToString("C2", CultureInfo.CurrentCulture);
    }
}
