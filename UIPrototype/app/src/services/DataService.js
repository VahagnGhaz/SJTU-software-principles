import http from "../http-common"

class StudentsDataService{

    delete(id)
    {
        return http.delete('http://localhost:3080/students/'+id)
    }

    getByName(fname, lname)
    {
        return http.get('http://localhost:3080/students/'+fname + "/" + lname)
    }

    getAll(){
        return http.get("http://localhost:3080/students")
    }
    getById(Id){
        return http.get('http://localhost:3080/students/' + Id)
    }

    update(id, data){
        return http.put('http://localhost:3080/students/' + id, data)
    }

    create(data){
        return http.post("http://localhost:3080/add-student", data)
    }
}

export default new StudentsDataService