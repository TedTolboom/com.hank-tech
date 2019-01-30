# Hank Tech
This app adds support for Z-wave devices made by [Hank Tech](http://www.hank-tech.com).  
<a href="https://github.com/TedTolboom/com.hank-tech">
  <img src="https://raw.githubusercontent.com/TedTolboom/com.hank-tech/master/assets/images/small.jpg">
</a>  

## Links:
[Hank Tech app Athom apps](https://apps.athom.com/app/com.hank-tech)                    
[Hank Tech app Github repository](https://github.com/TedTolboom/com.hank-tech)   

## Supported devices:
### Hank Scene controller 4 and 1 button version (HKZW-SCN04 & HKZW-SCN01)    
<a href="https://github.com/TedTolboom/com.hank-tech">
  <img src="https://rawgit.com/TedTolboom/com.hank-tech/master/drivers/HKZW-SCN04/assets/icon.svg" width="10%" height="10%">
</a>  

With the Hank Scene controller it is possible control any other devices (including non-Zwave) or set states / variables via Homey's flows.

The following triggers are supported:

* Button Pressed 1x    
* Button held down    
* Button released    
* Any button pressed (including tokens)   

The following conditions are supported:

* Battery alarm activated | Battery in healthy condition    

**Note:** All commands will be send to Homey. With this device it is possible to associate buttons to other devices to control them directly (without Homey).

### Hank Door / Window sensor (HKZW-DWS01)     
<a href="https://github.com/TedTolboom/com.hank-tech">
  <img src="https://rawgit.com/TedTolboom/com.hank-tech/master/drivers/HKZW-DWS01/assets/icon.svg" width="10%" height="10%">
</a>  

Door / Window sensor providing contact and tamper alarm.   

### Hank MultiSensor (HKZW-MS01)      
<a href="https://github.com/TedTolboom/com.hank-tech">
  <img src="https://rawgit.com/TedTolboom/com.hank-tech/master/drivers/HKZW-MS01/assets/icon.svg" width="10%" height="10%">
</a>  

MultiSensor providing motion, illumination, temperature and humidity data for Homey.   

### Hank Motion Sensor (HKZW-MS02)      
<a href="https://github.com/TedTolboom/com.hank-tech">
  <img src="https://rawgit.com/TedTolboom/com.hank-tech/master/drivers/HKZW-MS02/assets/icon.svg" width="10%" height="10%">
</a>  

Motion sensor providing motion alarm for Homey.   

### Hank Smart plug (HKZW-SO0x)      
<a href="https://github.com/TedTolboom/com.hank-tech">
  <img src="https://rawgit.com/TedTolboom/com.hank-tech/master/drivers/HKZW-SO0x/assets/icon.svg" width="10%" height="10%">
</a>  

Smart plug, including 2 USB ports, providing meter data as well as RGB led indication  

### Hank Flood sensor (HKZW-FLD01)      
<a href="https://github.com/TedTolboom/com.hank-tech">
  <img src="https://rawgit.com/TedTolboom/com.hank-tech/master/drivers/HKZW-FLD01/assets/icon.svg" width="10%" height="10%">
</a>  

Flood Sensor providing flooding-, tamper- and heat-alarm and temperature data for Homey.  

### Hank RGB Color Bulb (HKZW-RGB01)      
<a href="https://github.com/TedTolboom/com.hank-tech">
  <img src="https://rawgit.com/TedTolboom/com.hank-tech/master/drivers/HKZW-RGB01/assets/icon.svg" width="10%" height="10%">
</a>  

RGB bulb.  

## Supported Languages:
* English   
* Dutch    

## Supported Z-wave regions:
* Europe   
* U.S./Canada/Mexico        

## Acknowledgements:
This app and driver development has been supported by:   

* Robbshop by providing the devices for debugging:   
<a href="https://www.robbshop.nl/heat-it-wandthermostaat-zwaveplus-zwart">
  <img src="https://www.robbshop.nl/skin/frontend/robbshop/default/images/logo.svg" width="25%">

## Feedback:
Any requests please post them in the [Hank app topic on the Athom Community Forum](https://community.athom.com/t/162) or contact me on [Slack](https://athomcommunity.slack.com/team/tedtolboom)    
If possible, please report issues at the [issues section on Github](https://github.com/TedTolboom/com.hank-tech/issues) otherwise in the above mentioned topic.     

## Changelog:
### v1.1.3
* Add missing productTypeID for the HKZW-MS02[see](https://community.athom.com/t/162/9)   

### v1.1.2
* Add support for the Hank HKZW-RGB01 bulb (thanks to @caseda)         
* Add start-level and stop-level dim action cards for the Hank HKZW-RGB01 bulb        
**update:**   
* Update Homey meshdriver to 1.2.28

### v1.1.1
* Minor updates of Motion sensor parameters data ranges        
* Add link to [Hank app topic](https://community.athom.com/t/162) on community.athom.com   
**update:**   
* Update Homey meshdriver to 1.2.25     

### v1.1.0
* Add support for the new Hank motion sensor (HKZW-MS02)   
* Add support for the new Hank flood sensor (HKZW-FLD01)   
* Update meshdriver to 1.2.10       

### v1.0.3
* Fix issue with SCN01 flow card trigger   

### v1.0.2
* Add Homey community forum link   
* Update meshdriver to 1.2.8    
* Driver clean-up & SDK2 optimizations     

### v1.0.1
* Change Scene Controller device class to Sensor to enable default battery triggers (re-pair required)      

### v1.0.0
* App store release   
