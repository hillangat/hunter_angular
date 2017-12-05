import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemHeroService implements InMemoryDbService {
  createDb() {
    const trees = [
      {
        'groupid': 1,
        'stepId': 1,
        'stepCode': '001',
        'stepType': 'Workflow',
        'stepName': 'Create Art1',
        'parentId': 0,
        'drools': 'IT005, 008, 009',
        'committeeFlag': false,
        'adhocs': [
          {
            'groupid': 1,
            'stepId': 2,
            'stepCode': '002',
            'stepType': 'adhoc',
            'stepName': 'Create Art 1',
            'parentId': 1,
            'drools': null,
            'committeeFlag': false
          },
          {
            'groupid': 1,
            'stepId': 3,
            'stepCode': '003',
            'stepType': 'adhoc',
            'stepName': 'Create Art 2',
            'parentId': 1,
            'drools': null,
            'committeeFlag': false
          },
          {
            'groupid': 1,
            'stepId': 4,
            'stepCode': '004',
            'stepType': 'adhoc',
            'stepName': 'Create Art 3',
            'parentId': 1,
            'drools': null,
            'committeeFlag': false
          }
        ]
      },
      {
        'groupid': 1,
        'stepId': 5,
        'stepCode': '001',
        'stepType': 'Workflow',
        'stepName': 'Create Art2',
        'parentId': 0,
        'drools': 'IT005, 008, 009',
        'committeeFlag': false,
        'adhocs': [
          {
            'groupid': 1,
            'stepId': 6,
            'stepCode': '002',
            'stepType': 'adhoc',
            'stepName': 'Create Art 1',
            'parentId': 1,
            'drools': null,
            'committeeFlag': false
          },
          {
            'groupid': 1,
            'stepId': 7,
            'stepCode': '003',
            'stepType': 'adhoc',
            'stepName': 'Create Art 2',
            'parentId': 1,
            'drools': null,
            'committeeFlag': false
          },
          {
            'groupid': 1,
            'stepId': 8,
            'stepCode': '004',
            'stepType': 'adhoc',
            'stepName': 'Create Art 3',
            'parentId': 1,
            'drools': null,
            'committeeFlag': false
          }
        ]
      },
      {
        'groupid': 1,
        'stepId': 9,
        'stepCode': '001',
        'stepType': 'Workflow',
        'stepName': 'Create Art3',
        'parentId': 0,
        'drools': 'IT005, 008, 009',
        'committeeFlag': false,
        'adhocs': [
          {
            'groupid': 1,
            'stepId': 10,
            'stepCode': '002',
            'stepType': 'adhoc',
            'stepName': 'Create Art 1',
            'parentId': 1,
            'drools': null,
            'committeeFlag': false
          },
          {
            'groupid': 1,
            'stepId': 11,
            'stepCode': '003',
            'stepType': 'adhoc',
            'stepName': 'Create Art 2',
            'parentId': 1,
            'drools': null,
            'committeeFlag': false
          },
          {
            'groupid': 1,
            'stepId': 12,
            'stepCode': '004',
            'stepType': 'adhoc',
            'stepName': 'Create Art 3',
            'parentId': 1,
            'drools': null,
            'committeeFlag': false
          }
        ]
      },
      {
        'groupid': 1,
        'stepId': 13,
        'stepCode': '001',
        'stepType': 'Workflow',
        'stepName': 'Create Art4',
        'parentId': 0,
        'drools': 'IT005, 008, 009',
        'committeeFlag': false,
        'adhocs': [
          {
            'groupid': 1,
            'stepId': 14,
            'stepCode': '002',
            'stepType': 'adhoc',
            'stepName': 'Create Art 1',
            'parentId': 1,
            'drools': null,
            'committeeFlag': false
          },
          {
            'groupid': 1,
            'stepId': 15,
            'stepCode': '003',
            'stepType': 'adhoc',
            'stepName': 'Create Art 2',
            'parentId': 1,
            'drools': null,
            'committeeFlag': false
          },
          {
            'groupid': 1,
            'stepId': 16,
            'stepCode': '004',
            'stepType': 'adhoc',
            'stepName': 'Create Art 3',
            'parentId': 1,
            'drools': null,
            'committeeFlag': false
          }
        ]
      }
    ];
    return {trees};
  }
}

/**

 */
