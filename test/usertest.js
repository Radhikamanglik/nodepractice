const chai = require('chai');
const chaiHttp = require('chai-http');
let server = require("../src/app");
const constant=require("../src/constants/constant")
chai.should();
chai.use(chaiHttp);
let token;

const userLogin ={
    "email":"riya@gmail.com",
     "password":"password"
}

const userData = {
    firstName: 'kanu test',
    lastname: 'gupta',
    email: 'kanu@email.com',
    password: 'Kanu',
    role: 'USER'
}
let user_id;
let dummyUser;

describe('Users apis', () => {
    before(done => {
        chai
          .request('http://localhost:8085')
          .post("/api/auth/login")
          .send(userLogin)
          .end((err, res) => {
            
            token = res.body.data.token;
            res.should.have.status(constant.HTTP_201_CODE);
            done();
          });
      });
    
    describe('/POST Users', () => {
        it('it should post a user ',(done)=>{
            chai.request('http://localhost:8085')
            .post('/api/auth/register')
             .send(userData)
            .end((err,res)=>{
                // console.log(res);
                user_id=res.body._id;
                dummyUser=res.body;
                res.should.have.status(201);
                res.body.should.be.a('object');
                done();
            });
        });
        it('it should throw error if user exist', (done) => {
            chai.request(server)
                .post('/api/auth/register')
                .set('authorization', token)
                .send(userData)
                .end((err, res) => {
                    res.should.have.status(409);
                    done();
                });
        });
    });
    // describe('/GET Users', () => {
    //     it('it should get all users', (done) =>{
    //         chai.request(server)
    //         .get('/api/auth/read')
    //         .set('authorization', token)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.data.should.be.a("array");
    //             res.body.data.length.should.be.above(0);
    
    //             // res.body.should.be.a("array");
    //             // res.body.length.should.be.above(0);
    //             done();
    //         });
    //     })
    // })
   
});