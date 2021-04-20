The context of this test is to provide a simple application to display city weather forecast of Nepal.
API provided but fake data or any open source data can be used instead (in that case, any country is allowed).

Using React (preferred) or any Javascript framework of your choice,  implement the following features:

- Display cities locations for on a map
- On click on a city pin, display the next 3 days temperature (t) and humidity (hu) forcast on a chart (library of your choice, highcharts recommended).
- Deploy all this stack using docker and docker-compose
- API (use for this purpose only):
	- HTTP authentication : login:"test",password:"MfiTestReact2021$"
	- Request cities : http://93.93.42.137/api/cities?domain=nepal
	- Request a city forecast: http://93.93.42.137/api/forecast?area_id={int}
	- swagger documentation :  : http://93.93.42.137/media/swagger-ui/index.html
- [Optional] Make it responsive for mobile device.
- [Optional] Also display weather icon on the chart using parameter "ww". Code correlation can be founed in"substitutes" section on endpoint http://93.93.42.137/api/forecastconfig.

The source code should be delivered using github with detailed explanations on how to deploy and launch the project.
