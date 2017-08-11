import { Client } from '../beans/client';

export const clients:Client[] = [
    {
        clientId:1,
        clientTotalBudget:2000,
        receiver:true,
        taskIds:[1,2,3,6],
        firstName:'Sonko',
        lastName:'Mbuvi',
        email:'smbuvi@gmail.com',
        userName:'smbuvi244',
        cretDate:'2017-12-02 2:54:122',
        lastUpdate:'2017-12-02 2:54:122',
        createdBy:'admin',
        lastUpdatedBy:'admin',
        region: {
            regionId:1,
            regionName:'Silibwet Ward',
            population:5000,
            regionDesc:'Silibwet Ward Bomet Bomet Central',
            countryId:1,
            countyId:4,
            consId:32,
            wardId:32,
            coordinates:null,
            assignedTo:'admin',
            cretDate:'2017-12-31 05:12:05',
            createdBy:'admin',
            lastUpdate:'2017-12-31 05:12:05',
            lastUpdatedBy:'admin'
        }
    },
    {
        clientId:2,
        clientTotalBudget:5600,
        receiver:true,
        taskIds:[1,2,3,6],
        firstName:'Richard',
        lastName:'Tonui',
        email:'rtonui91@gmail.com',
        userName:'rtonui',
        cretDate:'2016-11-02 2:54:122',
        lastUpdate:'2016-12-02 2:54:122',
        createdBy:'admin',
        lastUpdatedBy:'admin',
        region:{
            regionId:2,
            regionName:'Chesoen Ward',
            population:3210,
            regionDesc:'Chesoen Ward Bomet Bomet Central',
            countryId:1,
            countyId:4,
            consId:32,
            wardId:33,
            coordinates:null,
            assignedTo:'admin',
            cretDate:'2017-12-31 05:12:05',
            createdBy:'admin',
            lastUpdate:'2017-12-31 05:12:05',
            lastUpdatedBy:'admin'
        }
    }
]

