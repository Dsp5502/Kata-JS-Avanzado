// * Ejercicio 1
const consoleButton = document.getElementById('console');
const typeButton = document.getElementById('type');
const operations = document.getElementById('operations');
const upper = document.getElementById('upper');
const longer = document.getElementById('longer');

consoleButton.addEventListener('click', () => {
  const messages = [
    { message: 'Este es un mensaje de log', type: 'log' },
    { message: 'Este es un mensaje de warn', type: 'warn' },
    { message: 'Este es un mensaje de info', type: 'info' },
    { message: 'Este es un mensaje de error', type: 'error' },
    { message: 'Este es un mensaje de table', type: 'table' },
  ];

  console.log('=== Ejercicio 1 ===');
  alert('Ver consola');
  for (const { message, type } of messages) {
    console[type](message);
  }
});

const showMessage = (message, logType, callback) => {
  const validLogTypes = ['log', 'warn', 'info', 'error', 'table'];
  if (!validLogTypes.includes(logType)) {
    throw new Error('Tipo de log no válido');
  }
  callback(message, logType);
};

// * Ejercicio 2

typeButton.addEventListener('click', () => {
  console.log('=== Ejercicio 2 ===');
  getDataTypeAndPrintContent(42, (dataType, content) => {
    console.log(`Tipo de dato: ${dataType}`);
    console.log(`Contenido: ${content}`);
    alert(`Tipo de dato: ${dataType} : ${content}`);
  });
});
const getDataTypeAndPrintContent = (variable, callback) => {
  const dataType = typeof variable;
  callback(dataType, variable);
};

// * Ejercicio 3

operations.addEventListener('click', () => {
  console.log('=== Ejercicio 3 ===');
  console.log(`5 + 3 = ${calculateOperation(5, 3, 'add')}`);
  console.log(`5 - 3 = ${calculateOperation(5, 3, 'subtract')}`);
  console.log(`5 * 3 = ${calculateOperation(5, 3, 'multiply')}`);
  console.log(`5 / 3 = ${calculateOperation(6, 2, 'divide')}`);

  // ejecutar cada 2 segundos}

  alert(
    `5 + 3 = ${calculateOperation(5, 3, 'add')}\n` +
      `5 - 3 = ${calculateOperation(5, 3, 'subtract')}\n` +
      `5 * 3 = ${calculateOperation(5, 3, 'multiply')}\n` +
      `5 / 3 = ${calculateOperation(6, 2, 'divide')}`
  );
});

const calculateOperation = (num1, num2, callback) => {
  const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => (b !== 0 ? a / b : 'Error: division by zero'),
  };

  return operations[callback](num1, num2);
};

// * Ejercicio 4
const transformString = (str, callback) => {
  return callback(str);
};

const toUpperCaseCallback = (str) => str.toUpperCase();
const toLowerCaseCallback = (str) => str.toLowerCase();

upper.addEventListener('click', () => {
  console.log(transformString('Hello World!', toUpperCaseCallback));
  console.log(transformString('Hello World!', toLowerCaseCallback));
  alert(
    `Hello World! : ${transformString('Hello World!', toUpperCaseCallback)}`
  );
  alert(
    `Hello World! : ${transformString('Hello World!', toLowerCaseCallback)}`
  );
});

// * Ejercicio 5

const filterGreaterThanTwoHours = (timeArray, callback) => {
  const result = timeArray.filter((minutes) => minutes > 120);
  callback(result);
};

longer.addEventListener('click', () => {
  const timeArray = [120, 80, 200, 100];
  const callbackFunction = (filteredArray) => {
    console.log(filteredArray);
    alert(`Los tiempos mayores a 2 horas son: ${filteredArray}`);
  };

  filterGreaterThanTwoHours(timeArray, callbackFunction);
});

const alert = (text = '') => {
  Toastify({
    text,
    duration: 2000,
    // destination: 'https://github.com/apvarun/toastify-js',
    // newWindow: true,
    // close: true,
    gravity: 'bottom', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, #008cffad, #8000804f)',
      height: '100px',
      padding: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '20px',
      fontSize: '1.5rem',
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};
