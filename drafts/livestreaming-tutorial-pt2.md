## Parte 2

### Un tutorial sobre como configurar un servicio de Streaming por HTTP en Vivo, usando Amazon AWS CloudFormation (EC2, CloudFront, S3) y Wowza Streaming Engine 4.2

- Última Actualización: **30/01/2017**
- Autor: [Oscar Chavez](http://oscarchavez.me)
- Contribuidores: - 

---
### Indice

1. [Introducción](#intro)
2. [Pt1. Preparativos Amazon](#pre1)
3. [Pt1. Preparativos Wowza](#pre2)
3. [Pt2. Configuración](#config1)
4. [Pt2. Pruebas](#test1)
5. [Pt3. Más configuración](#config2)
6. [Pt3. Más pruebas](#test2)

---

### Configuración

En esta parte vamos a utilizar a [Amazon AWS CloudFormation](https://aws.amazon.com/cloudformation), un servico que brinda a desarrolladores y sysadmins una forma muy fácil de crear stacks predeterminados usando otros recursos de AWS.

Es decir, ahorrarnos una gran parte del trabajo de **configuración de la máquina virtual**, **el servidor de ingesta de señal**, **la red de distribución de contenido**, etc.

### Creando un Stack para Transmisión en Vivo con AWS CloudFormation

Vamos a usar un *Wizard* para crear nuestro stack

1. Debemos tener nuestra sesión iniciada y procedemos a ingresar a [este link] (https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/new?stackName=LiveHTTPStreaming&templateURL=https:%2F%2Fs3.amazonaws.com%2Fcfwowza%2Flive-http-streaming-wowza-streaming-engine-4-2-BYOL-using-cloudfront.txt)
2. Seleccionamos el checkbox de *Specify Amazon S3 template URL* y escribimos tal cual: **https://s3-us-west-2.amazonaws.com/oscarchavez/wowza-livehttp-cloudformation.txt**
3. (Opcional) Visitamos el link *View/Edit in Designer* para observar nuestro stack visualmente y en formato *JSON*
4. Hacemos click en siguiente
5. En **Stack Name** escribimos algo apropiado, yo pondré *LiveHTTPStreaming*
6. En **Application Name** sin espacios escribimos cualquier cosa, yo pondré *live*
7. o 

[![awsstack](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/5-1.png)](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/5-1.png)
[![awsstack](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/5-2.png)](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/5-2.png)

