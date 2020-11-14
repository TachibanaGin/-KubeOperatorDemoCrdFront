<template>
  <div class="dashboard_page fillcontain">
    <section>
      <div>
        <h5 class="fuck">@auther:HatChin</h5>
      </div>
      <div align="center">
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span class="title" >LHCZ-Kubernetes_CRD-Demo</span>
        </div>

        <div class="text item">
          <!--工具条-->
          <el-row :gutter="20" >
            <el-col :span="16" class="toolbar" style="padding-bottom: 0px;">
              <el-form :inline="true" :model="select" align="left">
                <el-form-item>
                  <el-input v-model="select.frontname" placeholder="Frontname" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" v-on:click="getUserList" icon="el-icon-search">查询</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8" class="toolbar" style="padding-bottom: 0px;" align="right">
              <el-form :inline="true" >
                <el-form-item>
                  <el-button type="primary" v-on:click="AddUser" icon="el-icon-plus">添加</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
        <div class="text item">
          <!--数据-->
          <el-table :data="rows" style="width: 100%" stripe border height="400">
            <el-table-column id="frontname" label="front名" width="150" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>front名: {{ scope.row.metadata.name }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.metadata.name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column id="image" label="镜像" width="300" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>镜像: {{ scope.row.spec.image }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.spec.image }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <!--<el-table-column id="replicasReady" label="Ready" width="70" align="center">-->
              <!--<template slot-scope="scope">-->
                <!--<el-popover trigger="hover" placement="top">-->
                  <!--<p>副本数: {{ scope.row.status.readyReplicas }}</p>-->
                  <!--<div slot="reference" class="name-wrapper">-->
                    <!--<el-tag size="medium">{{ scope.row.status.readyReplicas }}</el-tag>-->
                  <!--</div>-->
                <!--</el-popover>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column id="replicas" label="副本数" width="70" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>副本数: {{ scope.row.spec.replicas }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.spec.replicas }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column id="port" label="容器端口" width="80" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>容器端口: {{ scope.row.spec.ports[0].port }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.spec.ports[0].port }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column id="nodeport" label="对外端口" width="80" align="center">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>对外端口: {{ scope.row.spec.ports[0].nodePort }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.spec.ports[0].nodePort}}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="userDetail(scope.$index, scope.row)">查看</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="userEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteUser(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination layout="total"
                         :page= 1
                         :total="total"
                         style="float:right;">
          </el-pagination>
        </div>
      </el-card>
      </div>


      <el-dialog title=" 添加新资源 " :visible.sync="addForm" :close-on-click-modal="false" width="30%" :before-close="closeAddUser" center>
        <el-form :model="form" label-width="80px" :rules="rules" ref="form">
          <div style="margin: 15px;">
            <el-form-item label="front名" prop="frontname"style="width:85%;">
              <el-input v-model="form.frontname"></el-input>
            </el-form-item>
          </div>
          <div style="margin: 15px;">
            <el-form-item label="镜像" prop="image"style="width:85%;">
              <el-input v-model="form.image"></el-input>
            </el-form-item>
          </div>
          <div style="margin: 15px;">
            <el-form-item label="副本数" prop="replicas"style="width:85%;">
              <el-input v-model="form.replicas"></el-input>
            </el-form-item>
          </div>
          <div style="margin: 15px;">
            <el-form-item label="容器端口" prop="port"style="width:85%;">
              <el-input v-model="form.port"></el-input>
            </el-form-item>
          </div>
          <div style="margin: 15px;">
            <el-form-item label="对外端口" prop="nodeport"style="width:85%;">
              <el-input v-model="form.nodeport"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="closeAddUser" round >取消</el-button>
          <el-button type="primary" @click.native="AddUserSubmit" :loading="formLoading" round>提交</el-button>
        </div>
      </el-dialog>


      <el-dialog title=" 修改资源 " :visible.sync="updateForm" :close-on-click-modal="false" width="30%" :before-close="closeUpdateUser" center>
        <el-form :model="form" label-width="80px" :rules="rules" ref="form">
          <div style="margin: 15px;">
            <el-form-item label="front名" prop="frontname"style="width:85%;">
              <el-input v-model="form.frontname" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div style="margin: 15px;">
            <el-form-item label="镜像" prop="image"style="width:85%;">
              <el-input v-model="form.image"></el-input>
            </el-form-item>
          </div>
          <div style="margin: 15px;">
            <el-form-item label="副本数" prop="replicas"style="width:85%;">
              <el-input v-model="form.replicas"></el-input>
            </el-form-item>
          </div>
          <div style="margin: 15px;">
            <el-form-item label="容器端口" prop="port"style="width:85%;">
              <el-input v-model="form.port"></el-input>
            </el-form-item>
          </div>
          <div style="margin: 15px;">
            <el-form-item label="对外端口" prop="nodeport"style="width:85%;">
              <el-input v-model="form.nodeport" :disabled="true"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="closeUpdateUser" round >取消</el-button>
          <el-button type="primary" @click.native="UpdateUserSubmit" :loading="formLoading" round>提交</el-button>
        </div>
      </el-dialog>

      <el-dialog title=" 查看资源 " :visible.sync="detailForm" :close-on-click-modal="false" width="40%" :before-close="closeDetailUser()" center>
        <el-collapse :model="detaildata">
          <el-collapse-item title="Front" name="1">
            <div><h6>front-name: {{detaildata.front.name}}</h6></div>
            <div><h6>镜像: {{detaildata.front.image}}</h6></div>
            <div><h6>副本数: {{detaildata.front.replicas}}</h6></div>
            <div><h6>容器端口: {{detaildata.front.port}}</h6></div>
            <div><h6>对外端口: {{detaildata.front.nodeport}}</h6></div>
          </el-collapse-item>
          <el-collapse-item title="Deployment & ReplicaSet" name="2">
            <div><h6>Deployment-name: {{detaildata.deploy.name}}</h6></div>
            <div><h6>镜像: {{detaildata.deploy.image}}</h6></div>
            <div><h6>可用副本数: {{detaildata.deploy.availableReplicas}}</h6></div>
            <div><h6>Ready副本数: {{detaildata.deploy.readyReplicas}}</h6></div>
            <div><h6>期望副本数: {{detaildata.deploy.replicas}}</h6></div>
            <div><h6>更新次数: {{detaildata.deploy.updateCount}}</h6></div>
          </el-collapse-item>
          <el-collapse-item title="Pods" name="3">
            <el-table :data="pods" style="width: 100%" stripe border>
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <div>
                    <el-form-item label="Name:">
                      <span>{{ scope.row.metadata.name }}</span>
                    </el-form-item>
                    </div>
                    <div>
                      <el-form-item label="Image:">
                        <span>{{ scope.row.spec.containers[0].image }}</span>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item label="ContainerPort:">
                        <span>{{ scope.row.spec.containers[0].ports[0].containerPort }}</span>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item label="PodIP:">
                        <span>{{ scope.row.status.podIP }}</span>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item label="HostIP:">
                        <span>{{ scope.row.status.hostIP }}</span>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item label="Status:">
                        <span>{{ scope.row.status.phase }}</span>
                      </el-form-item>
                    </div>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column id="pod-name" label="Pod-name" width="230" align="center">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>Pod-name: {{ scope.row.metadata.name }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.metadata.name }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column id="status" label="Status" width="160" align="center">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>Status: {{ scope.row.status.phase  }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.status.phase }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="podDetail(scope.$index, scope.row)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="Service" name="4">
            <div><h6>Service-name: {{detaildata.svc.name}}</h6></div>
            <div><h6>集群内IP: {{detaildata.svc.clusterIP}}</h6></div>
            <div><h6>Pods端口: {{detaildata.svc.port}}</h6></div>
            <div><h6>容器内端口: {{detaildata.svc.targetport}}</h6></div>
            <div><h6>对外端口: {{detaildata.svc.nodeport}}</h6></div>
          </el-collapse-item>
        </el-collapse>
      </el-dialog>

      <el-dialog title="Pod-Logs" :visible.sync="logForm">
        <el-dialog
          width="45%"
          title="Describe-Pod"
          :visible.sync="execForm"
          append-to-body>
          <div>
            <el-table :data="pod_status" style="width: 100%" stripe border>
              <el-table-column id="Pod-Status-Type" label="Pod-Status-Type"  width="auto" align="center">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>Pod-Status-Type: {{ scope.row.type }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.type }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column id="Pod-Status" label="Pod-Status" width="auto" align="center">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>Pod-Status: {{ scope.row.status  }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.status }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div>
            <!--<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 12}" placeholder="Pod-Status-Describe" v-model="pod_status_describe" :readonly="true">-->
          </div>
        </el-dialog>
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 12}" placeholder="Pod-Logs" v-model="pod_log" :readonly="true">
          </el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="logForm = false">取 消</el-button>
          <el-button type="warning" @click="execPod">进入容器</el-button>
          <el-button type="primary" @click="describePod">查看事件</el-button>
        </div>
      </el-dialog>

    </section>
  </div>
</template>

<script>

  import qs from 'qs';

  // import { Terminal } from "xterm";
  // import "xterm/dist/xterm.css";
  // import * as fit from "xterm/lib/addons/fit/fit";
  // // import * as winptyCompat from "xterm/dist/addons/winptyCompat/winptyCompat";
  // import * as webLinks from "xterm/dist/addons/webLinks/webLinks";
  //
  // Terminal.applyAddon(fit);
  // // Terminal.applyAddon(winptyCompat);
  // Terminal.applyAddon(webLinks); // Apply the `fullscreen` addon

  let data = () => {
    return {

      total: 0,
      //查询条件
      // selectUsername,
      // selectAccount,
      select: {
        frontname: ''
      },
      //页面数据
      rows: [],
      pods: [],
      detaildata: {
        front: {
          name: "",
          image: "",
          replicas: "",
          port: "",
          nodeport: "",
        },
        svc: {
          name: "",
          clusterIP: "",
          port: "",
          targetport: "",
          nodeport: "",
        },
        deploy: {
          name: "",
          image: "",
          availableReplicas: "",
          readyReplicas: "",
          replicas: "",
          updateCount: 0,
        },
        replica: [],
      },
      //页面载入状态
      pageLoading: false,
      //列表高度
      clientHeight: '100%',
      //表单数据
      form: {},
      //验证规则
      rules: rules,
      //对话框隐藏状态
      addForm: false,
      updateForm: false,
      detailForm: false,
      //表单提交状态
      formLoading: false,
      logForm: false,
      execForm: false,
      pod_log: "",
      activeNames: ['1'],
      containername: "",
      podname: "",
      podevent: "",
      fucktoken: "token is fail",
      pod_status: [],
      options: [],
    }
  }

  const rules = {
    frontname: [{
      required: true,
      message: '请输入front资源名',
      trigger: 'blur'},
      { validator: checkFrontname, trigger: 'blur' }],
    image: [{
      required: true,
      message: '请输入镜像',
      trigger: 'blur'}],
    replicas: [{
      required: true,
      message: '请输入副本数',
      trigger: 'blur'},
      { validator: checkReplicas, trigger: 'blur' }],
    port: [{
      required: true,
      message: '请输入容器内端口',
      trigger: 'blur'},
      { validator: checkPort, trigger: 'blur' }],
    nodeport: [{
      required: true,
      message: '请输入对外端口',
      trigger: 'blur',},
      { validator: checkNodePort, trigger: 'blur' }]
  }

  async function checkNodePort(rule,value,callback) {
    if (value < 30000 || value > 32767) {
      callback(new Error('对外端口范围为[30000-32767]'))
    }
  }
  async function checkPort(rule,value,callback) {
    if (value > 0) {
      callback
    }else {
      callback(new Error('请输入数字值'))
    }
  }  async function checkReplicas(rule,value,callback) {
    if (value > 0) {
      callback
    }else {
      callback(new Error('请输入数字值'))
    }
  }  async function checkFrontname(rule,value,callback) {
    if (/^[a-z-]+$/.test( value )) {
      callback
    }else {
      callback(new Error('frontname必须为全小写,可以用[ - ]分割'))
    }
  }

  let AddUser = function() {
    this.form = {}
    this.addForm = true
  }

  //关闭添加弹出框
  let closeAddUser = function(){
    this.form = {}
    this.$refs["form"].resetFields();
    this.addForm = false
  }

  let closeUpdateUser = function(){
    this.form = {}
    this.$refs["form"].resetFields();
    this.updateForm = false
  }

  //关闭添加弹出框
  let closeDetailUser = function(){
    // this.detailForm = false
  }

  //查询
  let getUserList = function() {
    if (this.pageLoading)
      return
    this.pageLoading = true

    let params = {
      frontname: this.select.frontname,
    }
    //调用post请求
    this.$axios.post('/Crd/Post/getFrontList', qs.stringify(params),{
      headers: {
        'token': sessionStorage.getItem("token"),
        'user': sessionStorage.getItem("user")
      }
    }).then(res => {

      this.pageLoading = false

      if (!res.data)
        return
      // console.log(res.data)
      if (params.frontname != "")
      {
        //页面元素赋值
        if (!res.data.frontList) {
          alert(params.frontname + "资源未找到,请注意大小写。")
          return
        }else{
          this.rows = []
          this.rows.push(res.data.frontList)
          this.total = 1
          return
        }
      }else {
        //页面元素赋值
        this.rows = res.data.frontList
        this.total = res.data.frontList.length
      }

    }).catch(e => {
        if(e.response.data.code == 401){
          this.$confirm('登录已经过期，请确定重新登录！')
          this.$router.push('/')
        }else if (e.response.status == 401){
          this.$confirm('登录已经过期，请确定重新登录！')
          this.$router.push('/')
        }
      },
      this.pageLoading = false)
  }


  //添加
  let AddUserSubmit = function() {
    if (this.formLoading)
      return

    this.$refs.form.validate(valid => {
      if (!valid)
        return

      this.formLoading = true

      //调用http协议
      this.$axios.post('/Crd/Post/addFront', qs.stringify(this.form),{
        headers: {
          'token': sessionStorage.getItem("token"),
          'user': sessionStorage.getItem("user")
        }
      }).then(res => {
        this.formLoading = false

        if (!res.data.success) {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          });
          return
        }
        this.$message({
          message: '添加成功!',
          type: 'success'
        })

        //重新载入数据
        this.getUserList()
        this.closeAddUser()
      }).catch(e => {
          if(e.response.data.code == 401){
            this.$confirm('登录已经过期，请确定重新登录！')
            this.$router.push('/')
          }else if (e.response.status == 401){
            this.$confirm('登录已经过期，请确定重新登录！')
            this.$router.push('/')
          }
        },
        this.formLoading = false)
    })
  }


  //删除
  let deleteUser = function(index, row) {
    if (this.pageLoading)
      return

    this.$confirm('此操作将永久删除该Front资源, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.pageLoading = true

      let cao = {
        frontname : row.metadata.name
      }

      this.$axios.post('/Crd/Post/delFront' , qs.stringify(cao),{
        headers: {
          'token': sessionStorage.getItem("token"),
          'user': sessionStorage.getItem("user")
        }
      }).then(res => {
        this.pageLoading = false

        if (!res.data.success) {
          this.$message({
            type: 'error',
            message: res.data.message
          })
          return
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.page = 1
        this.getUserList()

      }).catch(e => {
          if(e.response.data.code == 401){
            this.$confirm('登录已经过期，请确定重新登录！')
            this.$router.push('/')
          }else if (e.response.status == 401){
            this.$confirm('登录已经过期，请确定重新登录！')
            this.$router.push('/')
          }
        },
        this.pageLoading = false)
    }).catch(e => {})
  }

  //修改
  let userEdit = function(index, row) {
    this.updateForm = true
    // console.log(row)
    this.form = Object.assign({}, )
    this.form = Object.assign({}, row.metadata, row.spec , row.spec.ports[0])
    this.form.frontname = row.metadata.name
    this.form.nodeport = row.spec.ports[0].nodePort

  }

  //查看
  let userDetail = function(index, row) {
    this.detailForm = true
    // console.log(row)
    if (this.pageLoading)
      return

    this.detailForm = true

      let cao = {
        frontname : row.metadata.name
      }

      this.$axios.post('/Crd/Post/getFrontOne' , qs.stringify(cao),{
        headers: {
          'token': sessionStorage.getItem("token"),
          'user': sessionStorage.getItem("user")
        }
      }).then(res => {
        this.pageLoading = false

        if (!res.data.success) {
          this.$message({
            type: 'error',
            message: res.data.message
          })
          return
        }

        // console.log(res.data)
        // this.detaildata = res.data
        this.detaildata.front.name = res.data.front.metadata.name
        this.detaildata.front.image = res.data.front.spec.image
        this.detaildata.front.replicas = res.data.front.spec.replicas
        this.detaildata.front.port = res.data.front.spec.ports[0].port
        this.detaildata.front.nodeport = res.data.front.spec.ports[0].nodePort

        this.detaildata.deploy.name = res.data.deploy.metadata.name
        this.detaildata.deploy.image = res.data.deploy.spec.template.spec.containers[0].image
        this.detaildata.deploy.availableReplicas = res.data.deploy.status.availableReplicas
        this.detaildata.deploy.readyReplicas = res.data.deploy.status.readyReplicas
        this.detaildata.deploy.replicas = res.data.deploy.status.replicas
        // this.detaildata.deploy.updateCount = res.data.detaildata.replica.items.length
        this.detaildata.replica = res.data.replica
        this.detaildata.deploy.updateCount = this.detaildata.replica.items.length - 1

        this.detaildata.svc.name = res.data.svc.metadata.name
        this.detaildata.svc.clusterIP = res.data.svc.spec.clusterIP
        this.detaildata.svc.port = res.data.svc.spec.ports[0].port
        this.detaildata.svc.targetport = res.data.svc.spec.ports[0].targetPort
        this.detaildata.svc.nodeport = res.data.svc.spec.ports[0].nodePort

        this.pods = res.data.pods

      }).catch(e => {
          if(e.response.data.code == 401){
            this.$confirm('登录已经过期，请确定重新登录！')
            this.$router.push('/')
          }else if (e.response.status == 401){
            this.$confirm('登录已经过期，请确定重新登录！')
            this.$router.push('/')
          }
        },
        this.pageLoading = false)
  }

  let podDetail = function(index, row) {
    this.logForm = true
    // console.log(row)
    if (this.pageLoading)
      return

    this.logForm = true

    let fuck = {
      podname : row.metadata.name,
      containername : row.spec.containers[0].name
    }

    this.podname = fuck.podname
    this.containername = fuck.containername

    this.$axios.post('/Crd/Post/getPodDetail' , qs.stringify(fuck),{
      headers: {
        'token': sessionStorage.getItem("token"),
        'user': sessionStorage.getItem("user")
      }
    }).then(res => {
      this.pageLoading = false

      if (!res.data.success) {
        this.$message({
          type: 'error',
          message: res.data.message
        })
        return
      }

      this.pod_log = res.data.logs

      // console.log(this.pod_log)


    }).catch(e => {
        if(e.response.data.code == 401){
          this.$confirm('登录已经过期，请确定重新登录！')
          this.$router.push('/')
        }else if (e.response.status == 401){
          this.$confirm('登录已经过期，请确定重新登录！')
          this.$router.push('/')
        }
      },
      this.pageLoading = false)
  }

  let execPod = function() {
    let routeData = this.$router.resolve({
      name: "Terminal",
      query: {
        podname : this.podname,
        containername : this.containername,
      }
    });
    var newT = window.open(routeData.href, '/Terminal');
    // newT.close()
    // window.open(routeData.href, '/Terminal')
  }

  let describePod = function() {
    this.execForm = true
    // console.log(row)
    if (this.pageLoading)
      return

    this.execForm = true

    let fuck = {
      podname : this.podname
    }

    this.$axios.post('/Crd/Post/getDescribePod' , qs.stringify(fuck),{
      headers: {
        'token': sessionStorage.getItem("token"),
        'user': sessionStorage.getItem("user")
      }
    }).then(res => {
      this.pageLoading = false

      if (!res.data.success) {
        this.$message({
          type: 'error',
          message: res.data.message
        })
        return
      }

      this.pod_status = res.data.logs.status.conditions
      // console.log(this.pod_status)

    }).catch(e => {
        if(e.response.data.code == 401){
          this.$confirm('登录已经过期，请确定重新登录！')
          this.$router.push('/')
        }else if (e.response.status == 401){
          this.$confirm('登录已经过期，请确定重新登录！')
          this.$router.push('/')
        }
      },
      this.pageLoading = false)
  }
  // let execPod = function() {
  //   this.execForm = true
  //   // console.log(row)
  //   if (this.pageLoading)
  //     return
  //
  //   this.execForm = true
  //
  //   // 创建终端
  //   var term = new Terminal();
  //   term.open(document.getElementById('terminal'));
  //
  //   // 使用fit插件自适应terminal size
  //   term.fit();
  //   // term.winptyCompatInit()
  //   term.webLinksInit()
  //
  //   // 取得输入焦点
  //   term.focus();
  //   // console.log(this.podname,this.containername)
  //   // 连接websocket
  //   var ws = new WebSocket("ws:127.0.0.1:7777/Crd/Get/execPod?" + "podname=" + this.podname + "&containername=" + this.containername);
  //   ws.onopen = function(event) {
  //     console.log("onopen")
  //   }
  //   ws.onclose = function(event) {
  //     console.log("onclose")
  //   }
  //   ws.onmessage = function(event) {
  //     // 服务端ssh输出, 写到web shell展示
  //     term.write(event.data)
  //   }
  //   ws.onerror = function(event) {
  //     console.log("onerror")
  //   }
  //
  //   // 当浏览器窗口变化时, 重新适配终端
  //   window.addEventListener("resize", function () {
  //     term.fit()
  //
  //     // 把web终端的尺寸term.rows和term.cols发给服务端, 通知sshd调整输出宽度
  //     var msg = {type: "resize", rows: term.rows, cols: term.cols}
  //     ws.send(JSON.stringify(msg))
  //
  //     // console.log(term.rows + "," + term.cols)
  //   })
  //
  //   // 当向web终端敲入字符时候的回调
  //   term.on('data', function(input) {
  //     // 写给服务端, 由服务端发给container
  //     var msg = {type: "input", input: input}
  //     ws.send(JSON.stringify(msg))
  //   })
  //   // this.$axios.get('/Crd/Post/execPod?' + 'podname=' + fuck.podname + 'containername=' + fuck.containername ,{
  //   //   headers: {
  //   //     'token': sessionStorage.getItem("token"),
  //   //     'user': sessionStorage.getItem("user"),
  //   //   }
  //   // // this.$axios.post('/Crd/Post/execPod' , qs.stringify(fuck),{
  //   // //   headers: {
  //   // //     'token': sessionStorage.getItem("token"),
  //   // //     'user': sessionStorage.getItem("user"),
  //   // //   }
  //   // }).then(res => {
  //   //   this.pageLoading = false
  //   //
  //   //   if (!res.data.success) {
  //   //     this.$message({
  //   //       type: 'error',
  //   //       message: res.data.message
  //   //     })
  //   //     return
  //   //   }
  //   //
  //   //   this.pod_log = res.data
  //   //
  //   // }).catch(e => {
  //   //     if(e.response.data.code == 401){
  //   //       this.$confirm('登录已经过期，请确定重新登录！')
  //   //       this.$router.push('/')
  //   //     }else if (e.response.status == 401){
  //   //       this.$confirm('登录已经过期，请确定重新登录！')
  //   //       this.$router.push('/')
  //   //     }
  //   //   },
  //   //   this.pageLoading = false)
  // }

  let UpdateUserSubmit = function() {
    if (this.formLoading)
      return

    this.$refs.form.validate(valid => {
      if (!valid)
        return

      this.formLoading = true

      //调用http协议
      this.$axios.post('/Crd/Post/updateFront', qs.stringify(this.form),{
        headers: {
          'token': sessionStorage.getItem("token"),
          'user': sessionStorage.getItem("user")
        }
      }).then(res => {
        this.formLoading = false

        if (!res.data.success) {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          });
          return
        }
        this.$message({
          message: '修改成功!',
          type: 'success'
        })

        //重新载入数据
        this.page = 1
        this.getUserList()
        this.closeUpdateUser()
      }).catch(e => {
          if(e.response.data.code == 401){
            this.$confirm('登录已经过期，请确定重新登录！')
            this.$router.push('/')
          }else if (e.response.status == 401){
            this.$confirm('登录已经过期，请确定重新登录！')
            this.$router.push('/')
          }
        },
        this.formLoading = false)
    })
  }

  let initHeight = function() {
    this.clientHeight = (document.documentElement.clientHeight - 258) + 'px'
  }


  export default {
    data: data,
    methods: {

      //添加
      AddUser,
      initHeight,
      //获取分页
      getUserList,
      closeDetailUser,
      closeAddUser,
      closeUpdateUser,
      AddUserSubmit,
      deleteUser,
      userEdit,
      UpdateUserSubmit,
      userDetail,
      podDetail,
      execPod,
      describePod

    },

    mounted: function() {
      window.addEventListener('resize', this.initHeight)
      this.initHeight()
      this.getUserList()
    }
  }

</script>

<style lang="scss" scoped>


  .dashboard_page{
    width:100%;
    height:100%;
    background: no-repeat center top;
    background-size: 100% 100%;
    background-image:url(../assets/dashboard-bkg.jpg);

  }

  .title {
    width: 100%;
    top: 100px;
    left: 0;
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .fuck {
    width: 100%;
    top: 100px;
    left: 0;
    margin: 0px auto 40px auto;
    text-align: right;
    color: #505458;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 1100px;
    height: 600px;

  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
