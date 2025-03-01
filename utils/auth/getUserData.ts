import User from "@/types/User"

const getUserData = (payload: any): User => {
    return {
        userId: payload.userId,
        name: payload.name,
        email: payload.email,
        category: 'user', //to-do: integrare anche il tipo di utente officina (workshop),
        emailConfirmed: payload.emailConfirmed,
        imageurl: payload.imageUrl
    }
}

export default getUserData