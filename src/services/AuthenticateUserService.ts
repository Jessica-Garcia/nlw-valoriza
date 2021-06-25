import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { sign } from "jsonwebtoken"
import { Unauthorized } from "../errors";
import { HttpError } from "../errors/";

interface IAuthenticateRequest{
  email: string;
  password: string;
}

class AuthenticateUserService{

  async execute({email, password} : IAuthenticateRequest) {
     const usersRepositories = getCustomRepository(UsersRepositories);

    //verifivcar se email existe
    const user = await usersRepositories.findOne({
      email
    })

    if(!user){
      throw new Unauthorized("Email/Password incorrect");
    }


    //verificar se senha está correta, 

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Unauthorized("Email/Password incorrect");
    }

    //gerar o token

    const token = sign(
      {
        email: user.email
      },"41c37fab4569ebabcf41cd8d6ce4461c",{
        subject : user.id,
        expiresIn : "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService }