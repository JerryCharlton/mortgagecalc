document.getElementById("calculateButton").addEventListener("click", calculateResults);

  function calculateResults() {
    // Get input values and convert to numbers
    const rateInput = parseFloat(document.getElementById("rateInput").value);
    const yearsInput = parseFloat(document.getElementById("yearsInput").value);
    const grossRent = parseFloat(document.getElementById("grossRent").value);
    const insurance = parseFloat(document.getElementById("insurance").value);
    const propertyTax = parseFloat(document.getElementById("propertyTax").value);

    // Validate input values
    if (
      isNaN(rateInput) || isNaN(yearsInput) || isNaN(grossRent) ||
      isNaN(insurance) || isNaN(propertyTax) || 
      rateInput <= 0 || yearsInput <= 0 || grossRent <= 0 || insurance < 0 || propertyTax < 0
    ) {
      document.getElementById("result").innerHTML = "Please enter valid, positive numbers for all required inputs.";
      return;
    }

    // Calculate net rent by subtracting insurance and property tax from gross rent
    const netRent = grossRent - insurance - propertyTax;

    // Monthly rate calculation (assuming semi-annual compounding rate)
    const monthlyRate = (1 + rateInput / 200) ** (1 / 6) - 1;
    const numberOfPayments = yearsInput * 12;

    // Calculate present value and other values
    const presentValue = (netRent / monthlyRate) * (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    const breakEvenPrice = presentValue / 0.8;
    const downPayment = breakEvenPrice - presentValue;

    // Display results with formatting
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `
Net Rent/Mortgage Payment&nbsp;&nbsp;     ${netRent.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }  <br>
     20% Down Payment&nbsp;&nbsp;     ${downPayment.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
<br>
     80% Mortgage Amount&nbsp;&nbsp;     ${presentValue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
<br>
Break Even Purchase Price&nbsp;&nbsp;     ${breakEvenPrice.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
    `;
  }
