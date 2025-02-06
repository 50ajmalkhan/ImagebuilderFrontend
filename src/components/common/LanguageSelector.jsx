import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem } from '@mui/material';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'en', name: t('common.languages.en') },
    { code: 'ar', name: t('common.languages.ar') },
    { code: 'es', name: t('common.languages.es') },
    { code: 'fr', name: t('common.languages.fr') },
    { code: 'de', name: t('common.languages.de') },
    { code: 'it', name: t('common.languages.it') },
    { code: 'zh', name: t('common.languages.zh') },
    { code: 'ja', name: t('common.languages.ja') }
  ];

  const handleLanguageChange = (event) => {
    const langCode = event.target.value;
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      size="small"
      className="min-w-[120px] text-gray-200 bg-gray-800 border-gray-700 hover:border-gray-600"
      sx={{
        '& .MuiSelect-icon': {
          color: '#9ca3af',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#374151',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#4b5563',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#6366f1',
        },
        '& .MuiSelect-select': {
          color: '#e5e7eb',
        }
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: '#1f2937',
            border: '1px solid #374151',
            '& .MuiMenuItem-root': {
              color: '#e5e7eb',
              '&:hover': {
                bgcolor: '#374151',
              },
              '&.Mui-selected': {
                bgcolor: '#4b5563',
                '&:hover': {
                  bgcolor: '#4b5563',
                },
              },
            },
          },
        },
      }}
    >
      {languages.map((lang) => (
        <MenuItem key={lang.code} value={lang.code}>
          {lang.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSelector; 