import yfinance as yf
import json

# Create a Ticker object for Microsoft
ticker = "aapl"
stock = yf.Ticker(ticker)
info = stock.income_stmt

print(info)