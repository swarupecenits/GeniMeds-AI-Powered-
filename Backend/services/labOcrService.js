exports.extractLabValues = async (filePath) => {

  console.log('Extracting lab report values from:', filePath);
  return [
    { testName: 'Hemoglobin', value: '13.5', normalRange: '13-17', status: 'Normal' },
    { testName: 'WBC Count', value: '11.2', normalRange: '4-10', status: 'High' }
  ];
};
