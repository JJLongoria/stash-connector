import { StashConnector } from '../index';

describe('Testing Projects Endpoints', () => {
    test('Testing listProjects()', async () => {
        const connector = new StashConnector({
            user: 'PHE9090',
            password: 'Mayo.22',
            host: 'http://stash.intrayell.com',
        });
        const response = await connector.projects.list();
        console.log(response);
    }, 500000);
    test('Testing getProject()', async () => {
        const connector = new StashConnector({
            user: 'PHE9090',
            password: 'Mayo.22',
            host: 'http://stash.intrayell.com',
        });
        const response = await connector.projects.get('STAR');
        const imgResponse = await connector.projects.avatar('STAR').get();
        console.log(response);
        console.log(imgResponse);
    }, 500000);
    test('Testing listRepos()', async () => {
        const connector = new StashConnector({
            user: 'PHE9090',
            password: 'Mayo.22',
            host: 'http://stash.intrayell.com',
        });
        const response = await connector.projects.repos('STAR').list();
        const forksResponse = await connector.projects.repos('STAR').forks('salesforce').list();
        console.log(response);
        console.log(forksResponse);

        const commitsResponse = await connector.projects.repos('STAR').files('salesforce').list(undefined, 'cls');
        console.log(commitsResponse);
    }, 500000);
});