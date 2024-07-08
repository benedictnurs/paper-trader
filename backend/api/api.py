import yfinance as yf
import json

# Create a Ticker object for Microsoft
msft = yf.Ticker("MSFT")

# Fetch the full historical data on a monthly basis
hist = msft.history(period="max", interval="1mo")

# Convert the DataFrame to JSON
hist_json = hist.to_json()

# Optionally, you can format the JSON for readability
hist_json_pretty = json.dumps(json.loads(hist_json), indent=4)

# Write the JSON data to a file
with open('backend/api/stock.json', 'w') as file:
    file.write(hist_json_pretty)
