import { Assistant } from '../../models/Assistant';
import { ASSISTANTS_SEED } from '../constants/assistants';
import "../../db_config/mongo";

// Integrate assistants in Databasse 
const seedDatabaseWithAssistants = async () => {
    try {
        await Assistant.insertMany(ASSISTANTS_SEED);
        console.log('Assistants have been successfully imported !');
    } catch (error) {
        console.error('An error occurend during assistants import :', error);
    }
};

seedDatabaseWithAssistants();
