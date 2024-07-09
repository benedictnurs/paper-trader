from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
from yahoo_fin import stock_info as si

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/api", methods=["GET", "POST"])  # Accept GET and POST requests
def get_stock_data():
    if request.method == "POST":
        data = request.json

        if not data or 'ticker' not in data:
            return jsonify({"error": "No ticker provided"}), 400

        ticker = data.get('ticker', 'MSFT')  # Default to MSFT if no ticker provided
    else:
        ticker = 'AAPL'  # Default ticker for GET request

    # Create a Ticker object for the provided ticker
    stock = yf.Ticker(ticker)

    # Fetch the full historical data on a monthly basis
    hist = stock.history(period="max", interval="1mo")

    # Format the index to 'YYYY-MM-DD' format by converting it to strings
    hist.index = hist.index.strftime('%Y-%m-%d')

    # Convert the DataFrame to a dictionary
    hist_dict = hist.to_dict(orient="index")

    # Debugging: Print the formatted data

    # Return the formatted JSON data
    return jsonify(hist_dict)

if __name__ == '__main__':
    app.run(debug=True)
