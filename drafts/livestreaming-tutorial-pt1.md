## Parte 1

### Un tutorial sobre como configurar un servicio de Streaming por HTTP en Vivo, usando Amazon AWS CloudFormation (EC2, CloudFront, S3) y Wowza Streaming Engine 4

- Última Actualización: **24/01/2017**
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

### Introduction <a name="intro"></a>

En esta serie de tutoriales, voy a intentar explicar lo más detallado posible, como **preparar**, **instalar**, **configurar**, **probar** y **correr** el sistema que creemos desde 0.

En resumen técnico, vamos a aceptar una señal **RTMP** y vamos a *transcodear* la señal al protocolo adaptivo **HLS**, del cual haremos multiples copias y distribuiremos a multiples dispositivos.

#### Objetivo

El propósito de este tutorial es la creación de una guia abierta y editable que sirva como linea de aprendizaje y a la vez como *wiki*.

Debido a mi corta experiencia en webservers, protocolos, dockers, y sistemas operativos basados en linux, me voy a basar fuertemente en la [documentación oficial](http://docs.aws.amazon.com), otros tutoriales y obviamente en la interminable sabiduría almacenada en [StackOverflow](http://stackoverflow.com).


#### Metas

*La meta principal* es **transmitir en vivo** una señal de audio/video, ingestarla al servidor a través de **RTMP** y distribuir una señal constante en **FHD (1920x1080) ~ 3.5 Mbps** a por lo menos **1,000** "espectadores". 

*La meta secundaria* es crear un **balanceador de cargas** que pueda soportar hasta **3,000** "espectadores" e implementar un reproductor nativo de HTML5 en un portal web.

*La meta de Oscar* es tomar esa señal **HLS** y proyectarla en un ambiente/aplicación de VR/360º en **Unity3D** o **Nativo de Android**

#### Herramientas basadas en subscripción:

- [Amazon AWS EC2 (Cloud Computing)](https://aws.amazon.com/ec2/)
- [Amazon AWS CloudFront (CDN)](https://aws.amazon.com/cloudfront/)
- [Amazon AWS CloudFormation (Stack Templates)](http://aws.amazon.com/cloudformation)
- [Amazon AWS S3(Storage)](https://aws.amazon.com/s3/)
- [Wowza Streaming Engine 4.2](https://www.wowza.com/products/streaming-engine)

#### Herramientas:

- [OBS (Open Broadcasting Software)](https://obsproject.com/)
- [FreeBSD (Sistema Operativo, Linux)](https://www.freebsd.org/)
- [Apache Benchmark (HTTP Server Benchmark)](https://httpd.apache.org/docs/2.4/programs/ab.html)
- [Vagrant (Dev Environments)](https://www.vagrantup.com/)
- [Docker (Software Containerization)](https://www.docker.com/)
- [NGINX (High-performance HTTP Server)](https://www.nginx.com/resources/wiki/)
- [Unity3D (Game Engine)]()
- [Android Studio (Official Android IDE)](https://developer.android.com/studio/index.html?gclid=Cj0KEQiAk5zEBRD9lfno2dek0tsBEiQAWVKyuIwqlP3kM0FNPrfrwoGVSghwcXSxzO05pSDK1YoyvXUaArji8P8HAQ)
- [Sublime-Text (Text-Editor)](https://www.sublimetext.com/)
- [iTerm2 (Terminal Replacement)](https://www.iterm2.com/)

#### Protocolos a utilizar:

- RTMP (Real Time Messaging Protocol)
- HLS (HTTP Live Streaming)

---

###Preparativos Amazon <a name="pre1"></a>

Amazon AWS cuenta con una modalidad de **Free Tier**, que significa que al momento de subscribirnos a sus servicios en [aws.amazon.com](http://aws.amazon.com), tenemos **un año** de uso "gratis" (restringido) para un par de sus servicios principales.

> **OJO:** Desgraciadamente debemos contar con tarjeta de crédito para poder proceder. Esto es un mero paso para autenticar; Si nosotros seleccionamos los servicios del **Free Tier**, no incurriremos en ningun costo.

##### Crear cuenta en Amazon AWS

Debemos seguir las instrucciones en linea.

En el apartado de *Informacion de Pago*, te especifican que es solo para poder verificarte.

En la parte de *Identificación de Verificación*, no olviden de anteponer un #1 si es celular.

Escogeremos *Basic Support Plan* y procederemos a la *Consola*.

[![dashboard](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/1.png)](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/1.png)

##### Crear Key Pair de Amazon EC2

Amazon EC2 es el servicio de AWS de Computo en la Nube. Es decir, aquí vamos a montar nuestro Sistema Operativo y encima de este, nuestro engine.

1. Inciar sesión en la consola de Amazon EC2 en [console.aws.amazon.com/ec2](https://console.aws.amazon.com/ec2/)

2. Selecciona **us-west-2** en la región.

[![region](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/2_1.png)](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/2_1.png)

3. Es buena idea seleccionar una región cercana a nuestra ubicación. Yo estoy en la Ciudad de México, así que voy a seleccionar **us-west-2**, pero podría usar **us-west-1** también.

3. En la izquierda, selecciona *key pairs*.

4. Selecciona *Create Key Pair*

5. En el cuadro de dialog, ponle un nombre representativo y toma nota. Más tarde usaremos este nombre en AWS CloudFormation.

6. Guarda el archivo *.pem* en algun lugar seguro. **No podrás volver a bajarlo**

[![awsec2console](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/2_2.png)](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/2_2.png)

###Preparativos Wowza <a name="pre2"></a>

Wowza Streamin Engine, es un servidor de media que provee streaming en vivo y en demanda, ya sea local o en la nube. 

**Lo bueno**: Una de la soluciones más completas y robustas en el mercado.
 
**Lo malo**: Se paga alrededor de *95$ USD* por mes por instancia, pero tenemos un periodo de prueba de *30 días*

Debemos seguir los pasos que nos indiquen para conseguir una licencia.

[![wowzatrial](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/3.png)](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/3.png)

Cuando tengamos nuestra licenca, debe tener un formato similar a este:

ET1E4 - ***** - ****** - ***** - ***** - ************* - ***********

#### Subscribete a Wowza Streaming Engine 4 a través de AWS Marketplace

1. Inicia sesión en AWS
2. Ve al [Market place de Wowza](https://aws.amazon.com/marketplace/pp/B013FEULQA)
3. Debemos hacer click en *Continuar* y luego seleccionar la pestaña de *Manual Launch*
4. Selecionamos la versión de Wowza (A partir de 4.2) y la región **US West (Oregon)**
5. Hacemos click en *Accept Software Terms*

[![wowzainstall](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/4-1.png)](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/4-1.png)

Una vez teniendo la cuenta en Amazon AWS, y la licencia (de prueba) de Wowza y hemos subscrito Wowza a AWS a través de BYOL *(Bring Your Own License)*, podemos continuar con la **configuración**.

[![wowzasuccess](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/4-2.png)](http://www.vectorthree.com/ocr/oscarchavez/img/livestreaming/4-2.png)

---

### [Parte 2](http://www.oscarchavez.me/posts/creando-un-sistema-de-transmision-en-vivo-2)