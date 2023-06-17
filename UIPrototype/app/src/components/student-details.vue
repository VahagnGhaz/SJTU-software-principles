<template>
    <div class="container">
      <div class="card">
        <div class="card-header">Update student details</div> 
        <img class="card-img-top" src="holder.js/100x180/" alt="">
        <div class="card-body">
            <div class = "input-group">
                <input type="text" v-model="getfName" class="form-control ml-2" placeholder="First Name" />
                <input type="text" v-model="getlName" class="form-control ml-2" placeholder="Last Name" />
                <input type="text" v-model="getUsername" class="form-control ml-2" placeholder="Username" />
                <input type="text" v-model="getEmail" class="form-control ml-2" placeholder="E-mail" />
                <input type="text" v-model="getPassword" class="form-control ml-2" placeholder="Password" />
            </div>
            <button class="btn btn-primary" @click="updateStudent">Update</button>
            <div v-if="getResult" class="alert alert-secondary mt-2" role="alert"><p>{{getResult}}</p></div>
        </div>

      </div>
    </div>
  </template>

<script>
    import DS from '../services/DataService'

    export default{

      name: "update-student",
      data(){
        return{ 
          getResult: null,
          getUsername: "",
          getfName: "",
          getlName: "",
          getPassword: "", 
          getEmail: ""
        }
      },
      methods:{
        async updateStudent(){
            const data = {
                fname: this.getfName, 
                lname: this.getlName,
                email: this.getEmail,
                username: this.getUsername,
                password: this.getPassword
            }
            console.log(data)
            try {
                let Idstr=this.$route.params
                let ID = Number(Object.values(Idstr))
                console.log(typeof(ID), " ", ID)
                await DS.update(ID, data)   
                this.getResult= "Student detailes updated! \n"
            } catch (error) {
                this.getResult = error.getResult
            }


        }
      }

    }
</script>