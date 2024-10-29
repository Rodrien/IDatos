namespace Fing.Idatos.CoordinadorEventos.Domain.Entities
{
    public enum Currency
    {
        UYU,
        USD
    }

    public static class CurrencyExtensions
    {
        public static string ToSymbol(this Currency currency)
        {
            return currency switch
            {
                Currency.USD => "$",
                Currency.UYU => "$UYU",
                _ => throw new ArgumentOutOfRangeException(nameof(currency), currency, null)
            };
        }

        public static Currency FromString(string currency)
        {
            return currency switch
            {
                "USD" => Currency.USD,
                "UYU" => Currency.UYU,
                _ => throw new ArgumentOutOfRangeException(nameof(currency), currency, null)
            };
        }
    }   
}
