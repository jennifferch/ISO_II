
var http = require('http');

var ifs = require('os').networkInterfaces();
var resultIP = Object.keys(ifs)
  .map(x => ifs[x].filter(x => x.family === 'IPv4' && !x.internal)[0])
  .filter(x => x)[0].address;

var base_path_gpio = "/sys/class/gpio/gpio";
var value_path_hostname = "/etc/hostname";
var value_path_cpuinfo = "/proc/cpuinfo";
var value_path_uptime = "/proc/uptime";
var value_path_version = "/proc/version";
var value_path_meminfo = "/proc/meminfo";
var value_path_misc = "/proc/misc";
var value_path_partitions = "/proc/partitions";
var value_path_keys = "/proc/keys";

var value_path_led2 = "/sys/devices/platform/leds/of_node/led2/label";
var value_path_led3 = "/sys/devices/platform/leds/of_node/led3/label";
var value_path_led4 = "/sys/devices/platform/leds/of_node/led4/label";
var value_path_led5 = "/sys/devices/platform/leds/of_node/led5/label";

var pin_number = "7";
var value_gpio = base_path_gpio + pin_number + "/value";
var direction_gpio = base_path_gpio + pin_number + "/direction";

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<html>");
  response.write("<head>");
  response.write("<title>Devices BeagleBone Black\n</title>");
  response.write("</head>");
  response.write("<body>");
  response.write("<H1>Welcome to the BeagleBone Black</H1>");
  response.write("<table>");
  response.write("<tr>");
  response.write("<td>");
    response.write("<div>");
    response.write("<table style='align: center; border: 1pt solid #6666FF; width: 100%;height: 100%; border-collapse: collapse; background-color: #ffffff;'>");
    response.write("<tr>");
    response.write("<th style='align: center; background-color:#337AB7;'>");
    response.write("</th>");
    response.write("<td style='align: center; background-color:#337AB7;'>");
    response.write("Information Devices");
    response.write("</td>");
    response.write("</tr>");
    read(value_path_hostname, response);
    read(value_path_cpuinfo, response);
    read(value_path_uptime, response);
    read(value_path_version, response);
    read(value_path_meminfo, response);
    read(value_path_misc, response);
    read(value_path_partitions, response);
    read(value_path_keys, response);
    read(value_path_led2, response);
    read(value_path_led3, response);
    read(value_path_led4, response);
    read(value_path_led5, response);
    response.write("</table>");
    response.write("</div>");
  response.write("</td>");
  response.write("</tr>");

  response.write("<tr>");
  response.write("<td>");
    response.write("<div>");
    response.write("<table>");
    response.write("<tr>");
    response.write("<th>");
    response.write("Information GPIO");
    response.write("</th>");
    response.write("<td>");
    response.write("</td>");
    response.write("</tr>");
    read(value_gpio, response);
    read(direction_gpio, response);
    write(direction_gpio, 'high');
    read(value_gpio,response);
    read(direction_gpio, response);
    response.write("</table>");
    response.write("</div>");
  response.write("</td>");
  response.write("</tr>");
  response.write("</table>");
  response.write("</body>");
  response.write("</html>");
  response.end();

    function read(path,response){
        var fs = require('fs');
        var buf = fs.readFileSync(path, 'utf8');
        response.write("<tr>");
        response.write("<td align='left'>");
        response.write(path+ ': ');
        response.write("</td>");
        response.write("<td align='center'>");
        response.write(buf);
        response.write("</td>");        
        response.write("</tr>");
    }

    function write(path, value){
        var fs = require('fs');
        fs.writeFileSync(path, value, 'utf8');
    }

});

server.listen(8000);
console.log('BBB Web Server running at http://'+resultIP+':8000/');
