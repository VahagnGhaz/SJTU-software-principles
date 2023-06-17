<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Get all students data</div> 
      <img class="card-img-top" src="holder.js/100x180/" alt="">
      <div class="card-body">
        <div class="input-group mb-3">
          
          <button class="btn btn-primary" id = "getAllButton" @click="getAllData">Get All</button> 
          
          <input type="text" v-model="getId" class="form-control ml-2" placeholder="Id" />
          <div class="input-group-append">
            <button class="btn btn-primary" @click="getDataById">Find By Id</button>
          </div>

          <input type="text" v-model="getfName" class="form-control ml-2" placeholder="First Name"/>
          <div class="input-group-append">
            <input type="text" v-model="getlName" class="form-control ml-2" placeholder="Last Name"/>
          </div>
          
          <div class="input-group-append-">
            <button class="btn btn-primary" @click="searchByName">Find by name</button>
          </div>
          <button class="btn btn-sm btn-warning ml-2" @click="clearOutput">Clear</button>
          <div>
              <el-table :data="getResult" style="width: 100%">
              <el-table-column fixed prop="id" label="ID" width="50" />
              <el-table-column fixed prop="fname" label="First name" width="150" />
              <el-table-column prop="lname" label="Last name" width="150" />
              <el-table-column prop="username" label="Username" width="150" />
              <el-table-column prop="email" label="Email" width="250" />
              <el-table-column prop="password" label="Password" width="200" />
              <el-table-column fixed="right" label="Operations" width="120">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click="editStudent(scope.row)">Edit</el-button>
                  <el-button link type="danger" size="small" @click="deleteStudent(scope.row)">Delete</el-button>
                </template>
                
              </el-table-column>
            </el-table>
          </div>
        </div> 
      </div>
    </div>
  </div>
  
</template>

<script>
  import DS from '../services/DataService'
  import router from '../router.js'
  export default{

    name: "my-home",
    data(){
      return{ 
        getResult: null,
        getId: "",
        getfName: "",
        getlName: ""
      }
    },
    methods:{
      async getAllData(){
      this.clearOutput()
      const res=await DS.getAll()        
      this.getResult=res.data   
      },

      async getDataById()
      {
        this.clearOutput()
        let id = Number(this.getId)
        console.log(typeof(id), "\n" + id)
        const res = await DS.getById(id)
        this.getResult=res.data
        
      },

      async searchByName()
      {
        this.clearOutput()
        const fname=this.getfName
        const lname=this.getlName
        try {
          const res=await DS.getByName(fname, lname)
          this.getResult=res.data
        } catch (error) {
          this.getResult=this.formatResponse(error.getRsult)
        }
      },

      editStudent(row)
      {
        const Id = row.id
        router.push({name: 'student-details', params: { id: Id} })
      },

      async deleteStudent(row)
      {
        const Id = row.id
        await DS.delete(Id)
        this.clearOutput()
        this.getAllData()
      },

      clearOutput()
      {
        console.log("clearing output")
        this.getResult=null
      }
    }
  }
</script>

