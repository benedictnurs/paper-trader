import yfinance as yf
import json

# Create a Ticker object for Microsoft
msft = yf.Ticker("MSFT")

print(msft.earnings_dates)