//Listening for the Submit Button
document.getElementById('loan-form').addEventListener('submit', function(e){

    //Hiding the Results after the Calculate Button was Already Hit
    document.getElementById('results').style.display = 'none';
    
    //Showing the Loader when the Calculate Button is Hit
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//Calculating Results
function calculateResults(){

    //Grabbing Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    //Calculating the Monthly Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principle*x*calculatedInterest) / (x-1);

    if(isFinite(monthly)){

        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly* calculatedPayment) - principle).toFixed(2);

        //Changing the Results Display from Hidden to Displaying
        document.getElementById('results').style.display = 'block';

        //Hiding Loader when Calculation is Done
        document.getElementById('loading').style.display = 'none';

    }else{

        showError('Please Check Your Numbers');

    }
}

//Showing Error Message

function showError(error){

    //Changing the Results to None when there is a Error
    document.getElementById('results').style.display = 'none';

    //Hiding Loader when there is a Error
    document.getElementById('loading').style.display = 'none';

    //Creating a Div
    const errorDiv = document.createElement('div');

    //Getting Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Adding Class
    errorDiv.className = 'alert alert-danger';

    //Creating Text Node and Appending to Div
    errorDiv.appendChild(document.createTextNode(error)); 

    //Inserting the Error Message Above the Heading
    card.insertBefore(errorDiv, heading);

    //Adding a Time Limit to the Error Message (3 Seconds)
    setTimeout(clearError, 3000);

}

//Clearing the Error Message

function clearError(){

    document.querySelector('.alert').remove();

}