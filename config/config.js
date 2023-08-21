/*
 * Create and export configuration variables
 *
 */

let CONFIG = {};

CONFIG.PUBLIC_AUTH_API = process.env.PUBLIC_AUTH_API || 'http://10.132.14.215:80';
CONFIG.EpaymentCoreUrl = process.env.EpaymentCoreUrl || 'https://epayment-core.fundx.io';
CONFIG.PIN_CODE_FOR_TEST = process.env.PIN_CODE_FOR_TEST || '232323';

// Container for all environments
 CONFIG.environments = {};

// Development (default) environment
CONFIG.environments.development = {
  'httpPort' : process.env.dev_http_Port,
  'httpsPort' : process.env.dev_https_Port,
  'envName' : process.env.devEnvName,
  'hashingSecret' : process.env.dev_env_config_hash,
  'templateGlobals' : {
    'appName' : 'fundX',
    'companyName' : 'fundX Limited',
    'yearCreated' : '2023',
    'baseUrl' : process.env.base_url
  }
};

// Testing environment
CONFIG.environments.testing = {
  'httpPort' : process.env.ts_http_Port,
  'httpsPort' : process.env.ts_https_Port,
  'envName' : process.env.tsEnvName,
  'hashingSecret' : process.env.test_env_config_hash,
  'templateGlobals' : {
    'appName' : 'fundX App',
    'companyName' : 'fundX Limited',
    'yearCreated' : '2023',
    'baseUrl' : process.env.base_url
  }
};

// Production environment
CONFIG.environments.production = {
  'httpPort' : process.env.prod_http_Port,
  'httpsPort' : process.env.prod_https_Port,
  'envName' : process.env.prodEnvName,
  'hashingSecret' : process.env.prod_env_config_hash,
  'templateGlobals' : {
    'appName' : 'fundX App',
    'companyName' : 'fundX Limited',
    'yearCreated' : '2023',
    'baseUrl' : process.env.base_url
  }
};

// Determine which environment was passed as a command-line argument
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to Development
let environmentToExport = typeof( CONFIG.environments[currentEnvironment]) == 'object' ?  CONFIG.environments[currentEnvironment] :  CONFIG.environments.development;

// Export the module
module.exports = CONFIG;
