export type TypeCreancier = 'IAM' | 'BANQUE' | 'ONEE' | 'CLINIQUE' | 'AUTRE'

export interface Creancier {
    id : number
    nom : string
    typeCreancier: TypeCreancier
    ice : string 
    rc : string
    rib : string
    banque : string
    email : string
    telephone : string
    adresse : string
}
export interface CreateCreancier {
    nom : string
    typeCreancier: TypeCreancier
    ice : string 
    rc : string
    rib : string
    banque : string
    email : string
    telephone : string
    adresse : string
}