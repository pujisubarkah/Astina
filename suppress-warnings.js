// suppress-warnings.js
// This script suppresses Node.js deprecation warnings globally

// Suppress punycode deprecation warning
process.removeAllListeners('warning');
process.on('warning', (warning) => {
  // Filter out punycode deprecation warnings
  if (warning.name === 'DeprecationWarning' && 
      warning.message.includes('punycode module is deprecated')) {
    return; // Ignore this warning
  }
  // Show other warnings
  console.warn(warning.name + ': ' + warning.message);
});

// Also suppress via environment if not already set
if (!process.env.NODE_OPTIONS) {
  process.env.NODE_OPTIONS = '--no-deprecation';
}

module.exports = {};
