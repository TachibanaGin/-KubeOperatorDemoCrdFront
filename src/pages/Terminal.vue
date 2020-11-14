<template>
  <div id="terminal" style="height: 100%; width: 100%" ></div>
</template>

<script>

  import { Terminal } from "xterm";
  import "xterm/dist/xterm.css";
  import * as fit from "xterm/lib/addons/fit/fit";
  // import * as winptyCompat from "xterm/dist/addons/winptyCompat/winptyCompat";
  import * as webLinks from "xterm/dist/addons/webLinks/webLinks";
  import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';

  Terminal.applyAddon(fullscreen);  // Apply the `fullscreen` addon

  Terminal.applyAddon(fit);
  // Terminal.applyAddon(winptyCompat);
  Terminal.applyAddon(webLinks); // Apply the `fullscreen` addon

  let data = () => {
    return {

      podname: "",

      containername: "",

      podns: ""

    }
  }
  async function getData(podname) {
    // 按照id获取数据
    if (podname != this.podname){
      this.$router.go(0);
    }
    return
  }


  let execPod = function() {

    this.podname = this.$route.query.podname
    this.containername = this.$route.query.containername
    this.podns = sessionStorage.getItem("user")
    // console.log(this.podns)

    if(this.podname == "" || this.podname == null){
      window.close()
    }
    // 创建终端
    var term = new Terminal();
    term.open(document.getElementById('terminal'));

    term.toggleFullScreen();
    // 使用fit插件自适应terminal size
    term.fit();
    // term.winptyCompatInit()
    term.webLinksInit()

    // 取得输入焦点
    term.focus();
    // console.log(this.podname,this.containername)
    // 连接websocket
    //var ws = new WebSocket("ws:www.xjlhcz.com:10723/Crd/Get/execPod?" + "podname=" + this.podname + "&containername=" + this.containername);
    var ws = new WebSocket("wss:www.xjlhcz.com:10723/Crd/Get/execPod?" + "podname=" + this.podname + "&containername=" + this.containername + "&podns=" +  this.podns);
    ws.onopen = function(event) {
      console.log("onopen")
    }
    ws.onclose = function(event) {
      console.log("onclose")
    }
    ws.onmessage = function(event) {
      // 服务端ssh输出, 写到web shell展示
      term.write(event.data)
    }
    ws.onerror = function(event) {
      console.log("onerror")
    }

    // 当浏览器窗口变化时, 重新适配终端
    window.addEventListener("resize", function () {
      term.fit()

      // 把web终端的尺寸term.rows和term.cols发给服务端, 通知sshd调整输出宽度
      var msg = {type: "resize", rows: term.rows, cols: term.cols}
      ws.send(JSON.stringify(msg))

      // console.log(term.rows + "," + term.cols)
    })

    // 当向web终端敲入字符时候的回调
    term.on('data', function(input) {
      // 写给服务端, 由服务端发给container
      var msg = {type: "input", input: input}
      ws.send(JSON.stringify(msg))
    })
  }

    export default {
      data: data,
      watch: {
        '$route' (to, from) {
          this.getData(this.$route.query.podname)
        }
      },
      methods: {

        execPod,
        getData

      },
      mounted: function() {

        this.execPod()

      }
    }


</script>

<style scoped>

</style>
