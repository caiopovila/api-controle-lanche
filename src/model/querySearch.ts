export const queryTreatment = (query: string) => {
    let q: string[] = query.split(' ');

    let qret: string = '';

    for (let item of q) {
        let ret = '';
        ret = item.split('(').toString();
        ret = ret.split('@').toString();
        ret = ret.split(')').toString();
        ret = ret.split('*').toString();
        ret = ret.split('-').toString();
        if (item.length > 0)
            ret = ret + '*';

        qret = ret + ' ' + qret;
    }
    return qret;
}