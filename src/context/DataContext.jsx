import React, { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}

// Realistic SWIFT project data with multiple templates and tasks per project
const initialProjects = [
  {
    id: 'PRJ001',
    name: 'SWIFT GPI Phase 2 Deployment',
    status: 'In Progress',
    plannedStartDate: '2024-12-01T08:00:00',
    plannedEndDate: '2026-01-08T18:00:00',
    actualStartDate: '2024-12-01T08:30:00',
    actualEndDate: null,
    actualDuration: null,
    completionRate: 45,
    projectAdmin: 'John Smith',
    currentTask: 'Database Migration',
    templates: [
      {
        id: 'TMPL001',
        name: 'Infrastructure Setup Template',
        status: 'In Progress',
        createdBy: 'SLIBUNAO',
        createdOn: '2024-11-13',
        tasks: [
          {
            id: 'TASK001',
            name: 'Server Provisioning',
            description: 'Provision cloud servers for production environment',
            duration: 4,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Infrastructure Team',
            notes: 'Completed on time',
            status: 'Completed',
            actualDuration: 3.5
          },
          {
            id: 'TASK002',
            name: 'Network Configuration',
            description: 'Configure network security and routing',
            duration: 6,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK001',
            team: 'Network Team',
            notes: 'In progress',
            status: 'In Progress',
            actualDuration: 4
          },
          {
            id: 'TASK003',
            name: 'Database Migration',
            description: 'Migrate database to new infrastructure',
            duration: 24,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK002',
            team: 'Database Team',
            notes: 'Delayed by 2 hours due to connectivity issues',
            status: 'In Progress',
            actualDuration: 18
          },
          {
            id: 'TASK004',
            name: 'Load Balancer Setup',
            description: 'Configure load balancers for high availability',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK003',
            team: 'Infrastructure Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK005',
            name: 'Monitoring Setup',
            description: 'Setup monitoring and alerting systems',
            duration: 6,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK004',
            team: 'DevOps Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL002',
        name: 'Application Deployment Template',
        status: 'Pending',
        createdBy: 'MJOHNSON',
        createdOn: '2024-11-15',
        tasks: [
          {
            id: 'TASK006',
            name: 'Code Deployment',
            description: 'Deploy application code to production',
            duration: 2,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'DevOps Team',
            notes: 'Waiting for infrastructure',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK007',
            name: 'Service Integration',
            description: 'Integrate with SWIFT GPI services',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK006',
            team: 'Integration Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK008',
            name: 'API Configuration',
            description: 'Configure API endpoints and authentication',
            duration: 4,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK007',
            team: 'API Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK009',
            name: 'Service Health Checks',
            description: 'Perform health checks on all services',
            duration: 2,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK008',
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL003',
        name: 'Security Configuration Template',
        status: 'In Progress',
        createdBy: 'JSMITH',
        createdOn: '2024-11-20',
        tasks: [
          {
            id: 'TASK010',
            name: 'Security Audit',
            description: 'Perform comprehensive security audit',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Security Team',
            notes: 'Completed successfully',
            status: 'Completed',
            actualDuration: 14
          },
          {
            id: 'TASK011',
            name: 'Firewall Configuration',
            description: 'Configure firewall rules and policies',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK010',
            team: 'Security Team',
            notes: 'In progress',
            status: 'In Progress',
            actualDuration: 5
          },
          {
            id: 'TASK012',
            name: 'SSL Certificate Setup',
            description: 'Install and configure SSL certificates',
            duration: 4,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK011',
            team: 'Security Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK013',
            name: 'Access Control Setup',
            description: 'Configure access control and permissions',
            duration: 6,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK012',
            team: 'Security Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL004',
        name: 'Testing & Validation Template',
        status: 'Pending',
        createdBy: 'MJOHNSON',
        createdOn: '2024-11-25',
        tasks: [
          {
            id: 'TASK014',
            name: 'Unit Testing',
            description: 'Perform unit tests on all components',
            duration: 20,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK015',
            name: 'Integration Testing',
            description: 'Perform integration tests',
            duration: 24,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK014',
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK016',
            name: 'Performance Testing',
            description: 'Perform performance and load tests',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK015',
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK017',
            name: 'User Acceptance Testing',
            description: 'Conduct UAT with stakeholders',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK016',
            team: 'Business Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      }
    ]
  },
  {
    id: 'PRJ002',
    name: 'SWIFT MT/MX Migration',
    status: 'Planning',
    plannedStartDate: '2025-02-01T09:00:00',
    plannedEndDate: '2025-06-30T17:00:00',
    actualStartDate: null,
    actualEndDate: null,
    actualDuration: null,
    completionRate: 0,
    projectAdmin: 'Sarah Williams',
    currentTask: 'Not Started',
    templates: [
      {
        id: 'TMPL005',
        name: 'Message Format Migration Template',
        status: 'Intro',
        createdBy: 'SWILLIAMS',
        createdOn: '2024-12-20',
        tasks: [
          {
            id: 'TASK018',
            name: 'Format Analysis',
            description: 'Analyze existing MT message formats',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Analysis Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK019',
            name: 'MX Format Mapping',
            description: 'Map MT formats to MX equivalents',
            duration: 24,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK018',
            team: 'Analysis Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK020',
            name: 'Message Validation',
            description: 'Validate message format conversions',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK019',
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK021',
            name: 'Documentation',
            description: 'Document migration process and mappings',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK020',
            team: 'Documentation Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL006',
        name: 'System Integration Template',
        status: 'Intro',
        createdBy: 'SWILLIAMS',
        createdOn: '2024-12-22',
        tasks: [
          {
            id: 'TASK022',
            name: 'Integration Planning',
            description: 'Plan system integration approach',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Integration Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK023',
            name: 'API Development',
            description: 'Develop APIs for message conversion',
            duration: 32,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK022',
            team: 'Development Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK024',
            name: 'Integration Testing',
            description: 'Test integration with existing systems',
            duration: 20,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK023',
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK025',
            name: 'Performance Optimization',
            description: 'Optimize message processing performance',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK024',
            team: 'Development Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL007',
        name: 'Data Migration Template',
        status: 'Intro',
        createdBy: 'SWILLIAMS',
        createdOn: '2024-12-25',
        tasks: [
          {
            id: 'TASK026',
            name: 'Data Analysis',
            description: 'Analyze existing message data',
            duration: 20,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Data Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK027',
            name: 'Migration Script Development',
            description: 'Develop data migration scripts',
            duration: 24,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK026',
            team: 'Development Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK028',
            name: 'Data Migration Execution',
            description: 'Execute data migration process',
            duration: 40,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK027',
            team: 'Data Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK029',
            name: 'Data Validation',
            description: 'Validate migrated data integrity',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK028',
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      }
    ]
  },
  {
    id: 'PRJ003',
    name: 'SWIFT API Gateway Enhancement',
    status: 'In Progress',
    plannedStartDate: '2024-11-15T08:00:00',
    plannedEndDate: '2025-03-15T18:00:00',
    actualStartDate: '2024-11-15T08:15:00',
    actualEndDate: null,
    actualDuration: null,
    completionRate: 65,
    projectAdmin: 'Michael Brown',
    currentTask: 'API Testing',
    templates: [
      {
        id: 'TMPL008',
        name: 'API Development Template',
        status: 'In Progress',
        createdBy: 'MBROWN',
        createdOn: '2024-11-10',
        tasks: [
          {
            id: 'TASK030',
            name: 'API Design',
            description: 'Design RESTful API endpoints',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'API Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 10
          },
          {
            id: 'TASK031',
            name: 'API Implementation',
            description: 'Implement API endpoints',
            duration: 40,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK030',
            team: 'Development Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 38
          },
          {
            id: 'TASK032',
            name: 'API Testing',
            description: 'Perform comprehensive API testing',
            duration: 24,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK031',
            team: 'QA Team',
            notes: 'In progress - 60% complete',
            status: 'In Progress',
            actualDuration: 14
          },
          {
            id: 'TASK033',
            name: 'API Documentation',
            description: 'Create API documentation',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK032',
            team: 'Documentation Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL009',
        name: 'Gateway Configuration Template',
        status: 'In Progress',
        createdBy: 'MBROWN',
        createdOn: '2024-11-12',
        tasks: [
          {
            id: 'TASK034',
            name: 'Gateway Setup',
            description: 'Setup API gateway infrastructure',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Infrastructure Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 7
          },
          {
            id: 'TASK035',
            name: 'Routing Configuration',
            description: 'Configure API routing rules',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK034',
            team: 'Network Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 11
          },
          {
            id: 'TASK036',
            name: 'Rate Limiting Setup',
            description: 'Configure rate limiting policies',
            duration: 6,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK035',
            team: 'Security Team',
            notes: 'In progress',
            status: 'In Progress',
            actualDuration: 3
          },
          {
            id: 'TASK037',
            name: 'Monitoring Configuration',
            description: 'Setup monitoring for API gateway',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK036',
            team: 'DevOps Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL010',
        name: 'Security & Authentication Template',
        status: 'In Progress',
        createdBy: 'MBROWN',
        createdOn: '2024-11-14',
        tasks: [
          {
            id: 'TASK038',
            name: 'Authentication Setup',
            description: 'Setup OAuth2 authentication',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Security Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 14
          },
          {
            id: 'TASK039',
            name: 'Authorization Configuration',
            description: 'Configure authorization policies',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK038',
            team: 'Security Team',
            notes: 'In progress',
            status: 'In Progress',
            actualDuration: 8
          },
          {
            id: 'TASK040',
            name: 'Security Testing',
            description: 'Perform security testing',
            duration: 20,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK039',
            team: 'Security Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      }
    ]
  },
  {
    id: 'PRJ004',
    name: 'SWIFT Alliance Access Upgrade',
    status: 'In Progress',
    plannedStartDate: '2024-10-01T09:00:00',
    plannedEndDate: '2025-04-30T17:00:00',
    actualStartDate: '2024-10-01T09:00:00',
    actualEndDate: null,
    actualDuration: null,
    completionRate: 72,
    projectAdmin: 'David Chen',
    currentTask: 'Security Configuration',
    templates: [
      {
        id: 'TMPL011',
        name: 'Security Configuration Template',
        status: 'In Progress',
        createdBy: 'DCHEN',
        createdOn: '2024-09-25',
        tasks: [
          {
            id: 'TASK041',
            name: 'Security Audit',
            description: 'Perform security audit of existing system',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Security Team',
            notes: 'Completed successfully',
            status: 'Completed',
            actualDuration: 14
          },
          {
            id: 'TASK042',
            name: 'Security Configuration',
            description: 'Configure new security settings',
            duration: 20,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK041',
            team: 'Security Team',
            notes: 'In progress - configuring firewall rules',
            status: 'In Progress',
            actualDuration: 12
          },
          {
            id: 'TASK043',
            name: 'Access Control Setup',
            description: 'Setup new access control mechanisms',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK042',
            team: 'Security Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK044',
            name: 'Security Testing',
            description: 'Test security configurations',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK043',
            team: 'Security Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL012',
        name: 'System Upgrade Template',
        status: 'In Progress',
        createdBy: 'DCHEN',
        createdOn: '2024-09-28',
        tasks: [
          {
            id: 'TASK045',
            name: 'System Backup',
            description: 'Create full system backup',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Infrastructure Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 7
          },
          {
            id: 'TASK046',
            name: 'Software Upgrade',
            description: 'Upgrade Alliance Access software',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK045',
            team: 'Infrastructure Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 11
          },
          {
            id: 'TASK047',
            name: 'Configuration Migration',
            description: 'Migrate existing configurations',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK046',
            team: 'Configuration Team',
            notes: 'In progress',
            status: 'In Progress',
            actualDuration: 10
          },
          {
            id: 'TASK048',
            name: 'System Validation',
            description: 'Validate upgraded system',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK047',
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL013',
        name: 'Integration Testing Template',
        status: 'In Progress',
        createdBy: 'DCHEN',
        createdOn: '2024-10-05',
        tasks: [
          {
            id: 'TASK049',
            name: 'Integration Test Planning',
            description: 'Plan integration test scenarios',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'QA Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 7
          },
          {
            id: 'TASK050',
            name: 'Test Environment Setup',
            description: 'Setup test environment',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK049',
            team: 'Infrastructure Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 10
          },
          {
            id: 'TASK051',
            name: 'Integration Test Execution',
            description: 'Execute integration tests',
            duration: 24,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK050',
            team: 'QA Team',
            notes: 'In progress - 70% complete',
            status: 'In Progress',
            actualDuration: 16
          },
          {
            id: 'TASK052',
            name: 'Test Results Analysis',
            description: 'Analyze and document test results',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK051',
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      }
    ]
  },
  {
    id: 'PRJ005',
    name: 'SWIFT FileAct Implementation',
    status: 'In Progress',
    plannedStartDate: '2024-11-20T08:00:00',
    plannedEndDate: '2025-05-20T18:00:00',
    actualStartDate: '2024-11-20T08:00:00',
    actualEndDate: null,
    actualDuration: null,
    completionRate: 38,
    projectAdmin: 'Emily Rodriguez',
    currentTask: 'File Transfer Setup',
    templates: [
      {
        id: 'TMPL014',
        name: 'File Transfer Template',
        status: 'In Progress',
        createdBy: 'ERODRIGUEZ',
        createdOn: '2024-11-15',
        tasks: [
          {
            id: 'TASK053',
            name: 'FileAct Gateway Setup',
            description: 'Setup FileAct gateway infrastructure',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Infrastructure Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 7
          },
          {
            id: 'TASK054',
            name: 'File Transfer Setup',
            description: 'Configure file transfer protocols',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK053',
            team: 'Network Team',
            notes: 'Issue with certificate configuration - investigating',
            status: 'In Progress',
            actualDuration: 10
          },
          {
            id: 'TASK055',
            name: 'Testing & Validation',
            description: 'Test file transfer functionality',
            duration: 24,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK054',
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK056',
            name: 'Performance Optimization',
            description: 'Optimize file transfer performance',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK055',
            team: 'Development Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL015',
        name: 'File Processing Template',
        status: 'In Progress',
        createdBy: 'ERODRIGUEZ',
        createdOn: '2024-11-18',
        tasks: [
          {
            id: 'TASK057',
            name: 'File Format Validation',
            description: 'Implement file format validation',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Development Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 14
          },
          {
            id: 'TASK058',
            name: 'File Processing Logic',
            description: 'Develop file processing logic',
            duration: 32,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK057',
            team: 'Development Team',
            notes: 'In progress - 50% complete',
            status: 'In Progress',
            actualDuration: 16
          },
          {
            id: 'TASK059',
            name: 'Error Handling',
            description: 'Implement error handling mechanisms',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK058',
            team: 'Development Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK060',
            name: 'File Processing Testing',
            description: 'Test file processing functionality',
            duration: 20,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK059',
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL016',
        name: 'Monitoring & Reporting Template',
        status: 'Pending',
        createdBy: 'ERODRIGUEZ',
        createdOn: '2024-11-22',
        tasks: [
          {
            id: 'TASK061',
            name: 'Monitoring Setup',
            description: 'Setup monitoring for file transfers',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'DevOps Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK062',
            name: 'Reporting Dashboard',
            description: 'Create reporting dashboard',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK061',
            team: 'Development Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK063',
            name: 'Alert Configuration',
            description: 'Configure alerts for file transfer events',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK062',
            team: 'DevOps Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      }
    ]
  },
  {
    id: 'PRJ006',
    name: 'SWIFT FINplus Migration',
    status: 'Planning',
    plannedStartDate: '2025-03-01T09:00:00',
    plannedEndDate: '2025-09-30T17:00:00',
    actualStartDate: null,
    actualEndDate: null,
    actualDuration: null,
    completionRate: 0,
    projectAdmin: 'Robert Taylor',
    currentTask: 'Not Started',
    templates: [
      {
        id: 'TMPL017',
        name: 'FINplus Migration Template',
        status: 'Intro',
        createdBy: 'RTAYLOR',
        createdOn: '2024-12-15',
        tasks: [
          {
            id: 'TASK064',
            name: 'Requirements Analysis',
            description: 'Analyze FINplus requirements',
            duration: 40,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Analysis Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK065',
            name: 'System Assessment',
            description: 'Assess current system capabilities',
            duration: 24,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK064',
            team: 'Analysis Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK066',
            name: 'Migration Planning',
            description: 'Create detailed migration plan',
            duration: 32,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK065',
            team: 'Project Management Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK067',
            name: 'Stakeholder Review',
            description: 'Review plan with stakeholders',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK066',
            team: 'Business Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL018',
        name: 'Data Migration Template',
        status: 'Intro',
        createdBy: 'RTAYLOR',
        createdOn: '2024-12-18',
        tasks: [
          {
            id: 'TASK068',
            name: 'Data Analysis',
            description: 'Analyze existing FIN data',
            duration: 32,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Data Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK069',
            name: 'Data Mapping',
            description: 'Map FIN data to FINplus format',
            duration: 40,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK068',
            team: 'Data Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK070',
            name: 'Migration Script Development',
            description: 'Develop data migration scripts',
            duration: 48,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK069',
            team: 'Development Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK071',
            name: 'Data Migration Execution',
            description: 'Execute data migration',
            duration: 64,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK070',
            team: 'Data Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      }
    ]
  },
  {
    id: 'PRJ007',
    name: 'SWIFT Cloud Services Integration',
    status: 'In Progress',
    plannedStartDate: '2024-09-15T08:00:00',
    plannedEndDate: '2025-02-28T18:00:00',
    actualStartDate: '2024-09-15T08:00:00',
    actualEndDate: null,
    actualDuration: null,
    completionRate: 82,
    projectAdmin: 'Lisa Anderson',
    currentTask: 'Cloud Integration Testing',
    templates: [
      {
        id: 'TMPL019',
        name: 'Cloud Integration Template',
        status: 'In Progress',
        createdBy: 'LANDERSON',
        createdOn: '2024-09-10',
        tasks: [
          {
            id: 'TASK072',
            name: 'Cloud Environment Setup',
            description: 'Setup cloud environment and resources',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Cloud Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 11
          },
          {
            id: 'TASK073',
            name: 'Service Integration',
            description: 'Integrate SWIFT services with cloud',
            duration: 32,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK072',
            team: 'Integration Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 30
          },
          {
            id: 'TASK074',
            name: 'Cloud Integration Testing',
            description: 'Test cloud integration and performance',
            duration: 20,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK073',
            team: 'QA Team',
            notes: 'Final testing phase - 80% complete',
            status: 'In Progress',
            actualDuration: 16
          },
          {
            id: 'TASK075',
            name: 'Performance Optimization',
            description: 'Optimize cloud service performance',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK074',
            team: 'Cloud Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL020',
        name: 'Cloud Security Template',
        status: 'In Progress',
        createdBy: 'LANDERSON',
        createdOn: '2024-09-12',
        tasks: [
          {
            id: 'TASK076',
            name: 'Security Assessment',
            description: 'Assess cloud security requirements',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Security Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 14
          },
          {
            id: 'TASK077',
            name: 'Security Configuration',
            description: 'Configure cloud security settings',
            duration: 20,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK076',
            team: 'Security Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 18
          },
          {
            id: 'TASK078',
            name: 'Security Testing',
            description: 'Perform security testing',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK077',
            team: 'Security Team',
            notes: 'In progress',
            status: 'In Progress',
            actualDuration: 10
          },
          {
            id: 'TASK079',
            name: 'Compliance Validation',
            description: 'Validate compliance requirements',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK078',
            team: 'Compliance Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL021',
        name: 'Cloud Monitoring Template',
        status: 'In Progress',
        createdBy: 'LANDERSON',
        createdOn: '2024-09-14',
        tasks: [
          {
            id: 'TASK080',
            name: 'Monitoring Setup',
            description: 'Setup cloud monitoring tools',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'DevOps Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 11
          },
          {
            id: 'TASK081',
            name: 'Alert Configuration',
            description: 'Configure monitoring alerts',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK080',
            team: 'DevOps Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 7
          },
          {
            id: 'TASK082',
            name: 'Dashboard Creation',
            description: 'Create monitoring dashboards',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK081',
            team: 'DevOps Team',
            notes: 'In progress',
            status: 'In Progress',
            actualDuration: 10
          },
          {
            id: 'TASK083',
            name: 'Monitoring Validation',
            description: 'Validate monitoring setup',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK082',
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      }
    ]
  },
  {
    id: 'PRJ008',
    name: 'SWIFT Payment Controls Implementation',
    status: 'In Progress',
    plannedStartDate: '2024-12-10T08:00:00',
    plannedEndDate: '2025-06-10T18:00:00',
    actualStartDate: '2024-12-10T08:00:00',
    actualEndDate: null,
    actualDuration: null,
    completionRate: 28,
    projectAdmin: 'James Wilson',
    currentTask: 'Control Rules Configuration',
    templates: [
      {
        id: 'TMPL022',
        name: 'Payment Controls Template',
        status: 'In Progress',
        createdBy: 'JWILSON',
        createdOn: '2024-12-05',
        tasks: [
          {
            id: 'TASK084',
            name: 'Control Rules Design',
            description: 'Design payment control rules',
            duration: 24,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Business Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 22
          },
          {
            id: 'TASK085',
            name: 'Control Rules Configuration',
            description: 'Configure payment control rules in system',
            duration: 32,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK084',
            team: 'Configuration Team',
            notes: 'In progress - configuring rule engine',
            status: 'In Progress',
            actualDuration: 18
          },
          {
            id: 'TASK086',
            name: 'Testing & Validation',
            description: 'Test payment control rules',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK085',
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK087',
            name: 'Rule Documentation',
            description: 'Document control rules',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK086',
            team: 'Documentation Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL023',
        name: 'Compliance Template',
        status: 'In Progress',
        createdBy: 'JWILSON',
        createdOn: '2024-12-08',
        tasks: [
          {
            id: 'TASK088',
            name: 'Compliance Requirements Analysis',
            description: 'Analyze compliance requirements',
            duration: 16,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Compliance Team',
            notes: 'Completed',
            status: 'Completed',
            actualDuration: 14
          },
          {
            id: 'TASK089',
            name: 'Compliance Configuration',
            description: 'Configure compliance controls',
            duration: 20,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK088',
            team: 'Compliance Team',
            notes: 'In progress',
            status: 'In Progress',
            actualDuration: 12
          },
          {
            id: 'TASK090',
            name: 'Compliance Testing',
            description: 'Test compliance controls',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK089',
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK091',
            name: 'Audit Preparation',
            description: 'Prepare for compliance audit',
            duration: 8,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK090',
            team: 'Compliance Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      },
      {
        id: 'TMPL024',
        name: 'Reporting Template',
        status: 'Pending',
        createdBy: 'JWILSON',
        createdOn: '2024-12-10',
        tasks: [
          {
            id: 'TASK092',
            name: 'Reporting Requirements',
            description: 'Gather reporting requirements',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: null,
            team: 'Business Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK093',
            name: 'Report Development',
            description: 'Develop payment control reports',
            duration: 24,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK092',
            team: 'Development Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          },
          {
            id: 'TASK094',
            name: 'Report Testing',
            description: 'Test reporting functionality',
            duration: 12,
            unit: 'Hours',
            executionType: 'Sequence',
            dependentTask: 'TASK093',
            team: 'QA Team',
            notes: '',
            status: 'Pending',
            actualDuration: null
          }
        ]
      }
    ]
  }
]

const initialTasks = []
const initialTemplates = []

// Extract standalone tasks and templates
initialProjects.forEach(project => {
  project.templates.forEach(template => {
    initialTemplates.push({ ...template, projectId: project.id })
    template.tasks.forEach(task => {
      initialTasks.push({ ...task, templateId: template.id, projectId: project.id })
    })
  })
})

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('techTransitProjects')
    return saved ? JSON.parse(saved) : initialProjects
  })
  
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('techTransitTasks')
    if (saved) return JSON.parse(saved)
    const extracted = []
    projects.forEach(project => {
      project.templates.forEach(template => {
        template.tasks.forEach(task => {
          extracted.push({ ...task, templateId: template.id, projectId: project.id })
        })
      })
    })
    return extracted
  })
  
  const [templates, setTemplates] = useState(() => {
    const saved = localStorage.getItem('techTransitTemplates')
    if (saved) return JSON.parse(saved)
    const extracted = []
    projects.forEach(project => {
      project.templates.forEach(template => {
        extracted.push({ ...template, projectId: project.id })
      })
    })
    return extracted
  })

  // Sync to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('techTransitProjects', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem('techTransitTasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('techTransitTemplates', JSON.stringify(templates))
  }, [templates])

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: project.id || `PRJ${String(projects.length + 1).padStart(3, '0')}`,
      templates: project.templates || []
    }
    setProjects([...projects, newProject])
    return newProject
  }

  const updateProject = (id, updates) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const addTemplate = (template, projectId) => {
    const newTemplate = {
      ...template,
      id: template.id || `TMPL${String(templates.length + 1).padStart(3, '0')}`,
      tasks: template.tasks || [],
      projectId
    }
    setTemplates([...templates, newTemplate])
    
    // Also add to project
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return { ...p, templates: [...(p.templates || []), newTemplate] }
      }
      return p
    }))
    
    return newTemplate
  }

  const addTask = (task, templateId, projectId) => {
    const newTask = {
      ...task,
      id: task.id || `TASK${String(tasks.length + 1).padStart(3, '0')}`,
      templateId,
      projectId,
      status: task.status || 'Pending',
      actualDuration: task.actualDuration || null
    }
    setTasks([...tasks, newTask])
    
    // Also add to template and project
    setTemplates(templates.map(t => {
      if (t.id === templateId) {
        return { ...t, tasks: [...(t.tasks || []), newTask] }
      }
      return t
    }))
    
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          templates: p.templates.map(t => {
            if (t.id === templateId) {
              return { ...t, tasks: [...(t.tasks || []), newTask] }
            }
            return t
          })
        }
      }
      return p
    }))
    
    return newTask
  }

  const value = {
    projects,
    tasks,
    templates,
    addProject,
    updateProject,
    addTemplate,
    addTask,
    setProjects,
    setTasks,
    setTemplates
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
