// src/pages/SellPage.jsx
import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Paper, 
  Autocomplete, 
  TextField, 
  Divider,
  useTheme,
  Container,
  useMediaQuery,
} from '@mui/material';
import NumericInput from '../components/NumericInput';
import { CARAT_MULTIPLIERS, GST_PERCENTAGE } from '../constants/goldCalculations';

// Function to format number in Indian currency format (with commas)
const formatIndianCurrency = (num) => {
  const value = parseFloat(num).toFixed(2);
  const [wholePart, decimalPart] = value.toString().split('.');
  
  // Format the whole part with commas for lakhs and crores
  const lastThree = wholePart.substring(wholePart.length - 3);
  const otherNumbers = wholePart.substring(0, wholePart.length - 3);
  const formattedWholePart = otherNumbers 
    ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree 
    : lastThree;
  
  return `₹${formattedWholePart}.${decimalPart}`;
};

const SellPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [goldPrice, setGoldPrice] = useState('');
  const [carat, setCarat] = useState('22k');
  const [weight, setWeight] = useState('');
  const [labourCost, setLabourCost] = useState('');
  const [extraWeight, setExtraWeight] = useState('');
  const [results, setResults] = useState(null);
  const [formValid, setFormValid] = useState(false);

  const caratOptions = Object.keys(CARAT_MULTIPLIERS);

  useEffect(() => {
    setFormValid(
      goldPrice !== '' && 
      goldPrice > 0 &&
      carat !== '' &&
      weight !== '' && 
      weight > 0 &&
      labourCost !== '' && 
      labourCost >= 0
    );
  }, [goldPrice, carat, weight, labourCost]);

  const calculatePrice = () => {
    // Get the carat multiplier
    const caratMultiplier = CARAT_MULTIPLIERS[carat] || 
      (parseFloat(carat) / 24); // Calculate for custom carat
    
    // Convert extra weight from mg to g
    const extraWeightInGrams = extraWeight ? extraWeight * 0.001 : 0;
    
    // Total weight in grams
    const totalWeight = parseFloat(weight) + extraWeightInGrams;
    
    // Calculate price without GST
    const goldCost = (goldPrice * caratMultiplier) * totalWeight;
    const labourCostTotal = totalWeight * labourCost;
    const totalWithoutGST = goldCost + labourCostTotal;
    
    // Calculate price with GST
    const gstAmount = totalWithoutGST * GST_PERCENTAGE;
    const totalWithGST = totalWithoutGST + gstAmount;
    
    setResults({
      withoutGST: totalWithoutGST.toFixed(2),
      withGST: totalWithGST.toFixed(2),
      breakdown: {
        goldCost: goldCost.toFixed(2),
        labourCost: labourCostTotal.toFixed(2),
        gst: gstAmount.toFixed(2)
      }
    });
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        width: '100%',
        px: { xs: 1, sm: 2, md: 3 } // Responsive padding
      }}
    >
      <Box
        sx={{
          width: '100%',
          mb: 4,
          ...(isMobile ? {
            p: 2,
            bgcolor: 'transparent'
          } : {
            p: 3,
            bgcolor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 3
          })
        }}
      >
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            mb: 3,
            textAlign: 'center',
            color: 'text.primary',
          }}
        >
          Calculate Selling Price
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <NumericInput
              label="Price of 24K Gold (1g)"
              value={goldPrice}
              onChange={setGoldPrice}
              startAdornment="₹"
              required
              allowDecimals={true}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Autocomplete
              value={carat}
              onChange={(event, newValue) => {
                setCarat(newValue);
              }}
              options={caratOptions}
              freeSolo
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Gold Carat" 
                  required 
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <NumericInput
              label="Weight"
              value={weight}
              onChange={setWeight}
              endAdornment="g"
              required
              allowDecimals={true}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <NumericInput
              label="Labour Cost (per gram)"
              value={labourCost}
              onChange={setLabourCost}
              startAdornment="₹"
              required
              allowDecimals={true}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <NumericInput
              label="Extra Weight (optional)"
              value={extraWeight}
              onChange={setExtraWeight}
              endAdornment="mg"
              allowDecimals={false}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              // color="primary" 
              size="large" 
              fullWidth
              onClick={calculatePrice}
              disabled={!formValid}
              sx={{ 
                mt: 2, 
                py: 1.5,
                fontWeight: 'bold',
                color: 'text.primary',
              }}
            >
              Calculate Price
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      {results && (
        <Box
          sx={{
            width: '100%',
            ...(isMobile ? {
              p: 2,
              bgcolor: 'transparent'
            } : {
              p: 3,
              bgcolor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: 3
            })
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ textAlign: 'center', color: 'text.primary' }}
          >
            Price Calculation Results
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'rgba(255, 255, 255, 0.05)', 
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                }
              }}>
                <Typography variant="subtitle1" color="text.primary">Price Without GST:</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                  {formatIndianCurrency(results.withoutGST)}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                p: 2, 
                bgcolor: theme.palette.primary.dark,
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: theme.palette.primary.main,
                }
              }}>
                <Typography variant="subtitle1" color="background.paper">Price With GST (3%):</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'background.paper' }}>
                  {formatIndianCurrency(results.withGST)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
            Breakdown
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                textAlign: 'center'
              }}>
                <Typography variant="body2" color="text.secondary">Gold Cost:</Typography>
                <Typography variant="h6" color="primary">
                  {formatIndianCurrency(results.breakdown.goldCost)}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                textAlign: 'center'
              }}>
                <Typography variant="body2" color="text.secondary">Labour Cost:</Typography>
                <Typography variant="h6" color="primary">
                  {formatIndianCurrency(results.breakdown.labourCost)}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                textAlign: 'center'
              }}>
                <Typography variant="body2" color="text.secondary">GST (3%):</Typography>
                <Typography variant="h6" color="primary">
                  {formatIndianCurrency(results.breakdown.gst)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default SellPage;