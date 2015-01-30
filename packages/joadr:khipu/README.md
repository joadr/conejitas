# English:
## Khipu package for meteor projects
This package contains everything you need to receive money on your bank account using Khipu
Developed by Joaquín Díaz (Joadr)

## Configuration
In a Server folder add the following lines and complete the the values
```
khipu.config = {
	url: 'https://khipu.com/api/1.3/',
	receiver_id: '', // Your receiver ID in khipu
	secret: '', // Your Secret Key
	notify_url: '',
	return_url: '',
}
```
======

# Español:
## Extensión Khipu para proyectos meteor
Esta extensión tiene todo lo que necesitas para recibir dinero en tu cuenta bancaria usando Khipu
Desarrollado por Joaquín Díaz (Joadr)

## Configuración
En la carpeta "Server" de tu proyecto, crea un archivo y escribe las siguientes líneas y cambia los valores según corresponda
```javascript
khipu.config = {
	url: 'https://khipu.com/api/1.3/', //Khipu api (leave it like this)
	receiver_id: '', // Your receiver ID in khipu
	secret: '', // Your Secret Key
}
```
### Configuración extra:
En el khipu.config además puedes agregar los siguientes parámetros, los cuales son opcionales y si se dejan en blanco, se utilizarán los por defecto.
```javascript
	cancel_url: 'http://mysite.com/cancelURL',
```
El cancel_url corresponde al sitio al cual se va a enviar al cliente en caso de que cancele la operación de pago.

```javascript
	return_url: 'http://mysite.com/returnURL',
```
El return_url corresponde al sitio al cual se enviará al cliente en caso de que se complete la transacción pero sin ser aún verificada

## Diagrama de flujo
Las transacciones en khipu tienen un flujo de 5 pasos los cuales corresponden a:
![alt text](https://s3.amazonaws.com/static.khipu.com/flujo-pago.png "Diagrama flujo")

## Funciones:

```javascript
	khipu_check_cobrador_state()
```
Verifica que el id de usuario khipu ingresado está listo para cobrar desde el sitio web.

======

```javascript
	khipu_get_banks()
```
Obtiene la lista de bancos disponible para realizar la transacción junto con su id de banco.

======

```javascript
	khipu_get_new_payment: function(email, bankId, amount, transaction_id)
```
Le dice a khipu que se va a realizar un cobro. Se le debe especificar el email del cliente que pagará, el id del banco, el monto de la transacción y opcionalmente se le puede especificar un id de transacción customizado. En caso de que este último parametro se omita, el sistema le asignará uno aleatorio.

=======

```javascript
	khipu_verify_payment_notification(data)
```

