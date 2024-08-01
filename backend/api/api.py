import yfinance as yf
import json

# Create a Ticker object for Microsoft
ticker = "aapl"
stock = yf.Ticker(ticker)
info = stock.history(period="max", interval="1mo").to_dict(orient="index")
    
print(info)