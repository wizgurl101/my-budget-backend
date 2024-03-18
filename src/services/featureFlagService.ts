import * as Rox from 'rox-node';

const flags = {
   testingFlag: new Rox.Flag()
};

export async function initRollout() {
    const options = {}

    Rox.register('', flags);

    try {
        await Rox.setup( process.env.ROLLOUT_KEY, options);
        return flags;
    } catch (error) {
        console.error('Unable to initiate Rollout: ', error)
    }
}