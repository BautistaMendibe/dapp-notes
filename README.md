Aplicación Descentralizada de Notas.

Cada nota junto a su estado e información es guardada en la blockchain. 
Para probarla puedes deployar el contrato "TaskContract" en una blockchain local (ver herramientas como Ganache para esto) usando algún framework como
Truffle o Hardhat. Además puedes levantar un servidor local que lea el contenido de la carpeta Client, donde se encuentran los archivos referentes al 
front-end de la aplicación. Recomiendo probar el módulo de node llamado lite-server.

El fron-end está hecho con bootstrap así funciona de manera fácil y rápida en dispositivos de diferentes tamaños.

Al momento de crear una nota o actualizar el valor que indica si la tarea está realizada o no es necesario interactuar con la blockchain, por lo que lleva
un gasto referente al gas de la red. Para eso dentro de la aplicación nos fijamos si el usuario tiene instalada en su navegador la billetera metamask. 

Para interactuar con la aplicación de manera gratuita puedes vincular la cuenta que genera Ganache.

Espero que les sirva! Saludos. 

Demostración de la app en funcionamiento:

![Alt Text](https://media.giphy.com/media/mdbUGtaJ93ehTzLjvO/giphy.gif) 
