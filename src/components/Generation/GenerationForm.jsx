import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Alert,
  Chip,
  Fade
} from '@mui/material';
import { ImagePlus, Video, Wand2, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToHistory, setGenerating } from '../../store/slices/generationSlice';

const SAMPLE_PROMPTS = [
  'A serene mountain landscape at sunset',
  'Modern minimalist product photography',
  'Abstract digital art with neon colors',
  'Cinematic urban scene in the rain'
];

const GenerationForm = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState('image');
  const [prompt, setPrompt] = useState('');
  const [referenceImage, setReferenceImage] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setError('');
    dispatch(setGenerating(true));

    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        type,
        prompt,
        imageUrl: type === 'image'
          ? 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
          : 'https://images.unsplash.com/photo-1536240478700-b869070f9279',
        createdAt: new Date().toISOString(),
      };

      dispatch(addToHistory(mockResult));
      dispatch(setGenerating(false));
      setPrompt('');
      setReferenceImage(null);
    }, 2000);
  };

  const handleSamplePrompt = (samplePrompt) => {
    setPrompt(samplePrompt);
  };

  return (
    <Paper elevation={0} className="border border-gray-100 rounded-xl p-6">
      <Typography variant="h6" className="mb-2">Generate Content</Typography>
      <Typography color="text.secondary" className="mb-6">
        Describe what you want to create in detail
      </Typography>

      {error && (
        <Fade in={true}>
          <Alert 
            severity="error" 
            className="mb-4"
            action={
              <Button 
                color="inherit" 
                size="small" 
                onClick={() => setError('')}
              >
                <X className="w-4 h-4" />
              </Button>
            }
          >
            {error}
          </Alert>
        </Fade>
      )}

      <form onSubmit={handleGenerate} className="space-y-6">
        <RadioGroup
          row
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 bg-gray-50 rounded-lg inline-flex gap-2"
        >
          <FormControlLabel
            value="image"
            control={
              <Radio 
                sx={{
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            }
            label={
              <Box className="flex items-center">
                <ImagePlus className="w-4 h-4 mr-2" />
                Image
              </Box>
            }
            className={`m-0 px-3 py-1.5 rounded-lg transition-all ${
              type === 'image' ? 'bg-white shadow-sm' : ''
            }`}
          />
          <FormControlLabel
            value="video"
            control={
              <Radio 
                sx={{
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            }
            label={
              <Box className="flex items-center">
                <Video className="w-4 h-4 mr-2" />
                Video
              </Box>
            }
            className={`m-0 px-3 py-1.5 rounded-lg transition-all ${
              type === 'video' ? 'bg-white shadow-sm' : ''
            }`}
          />
        </RadioGroup>

        <Box>
          <Typography variant="subtitle2" className="mb-2">
            Try these prompts:
          </Typography>
          <Box className="flex flex-wrap gap-2 mb-4">
            {SAMPLE_PROMPTS.map((samplePrompt, index) => (
              <Chip
                key={index}
                label={samplePrompt}
                onClick={() => handleSamplePrompt(samplePrompt)}
                className="hover:bg-blue-50 cursor-pointer transition-colors"
              />
            ))}
          </Box>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Be specific about what you want to create..."
          className="bg-white"
        />

        {type === 'video' && (
          <Box>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setReferenceImage(e.target.files[0])}
              className="hidden"
              id="reference-image"
            />
            <label htmlFor="reference-image">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                className="h-32 border-dashed"
              >
                {referenceImage ? (
                  <Box className="relative w-full h-full">
                    <img
                      src={URL.createObjectURL(referenceImage)}
                      alt="Reference"
                      className="h-full object-contain"
                    />
                    <Button
                      size="small"
                      color="error"
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setReferenceImage(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </Box>
                ) : (
                  <Box className="text-center">
                    <ImagePlus className="w-6 h-6 mx-auto mb-2" />
                    <Typography>Upload Reference Image (Optional)</Typography>
                  </Box>
                )}
              </Button>
            </label>
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          startIcon={<Wand2 className="w-5 h-5" />}
          className="h-12 text-base"
        >
          Generate {type === 'image' ? 'Image' : 'Video'}
        </Button>
      </form>
    </Paper>
  );
};

export default GenerationForm;