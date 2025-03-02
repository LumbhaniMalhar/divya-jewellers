import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  useTheme,
  Container,
  useMediaQuery,
  TextField,
	Divider
} from '@mui/material';
import NumericInput from '../components/NumericInput';
import { GST_PERCENTAGE } from '../constants/goldCalculations';

// Function to format number in Indian currency format (with commas)
const formatIndianCurrency = (num) => {
  const value = parseFloat(num).toFixed(2);
  const [wholePart, decimalPart] = value.toString().split('.');
  
  const lastThree = wholePart.substring(wholePart.length - 3);
  const otherNumbers = wholePart.substring(0, wholePart.length - 3);
  const formattedWholePart = otherNumbers 
    ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree 
    : lastThree;
  
  return `₹${formattedWholePart}.${decimalPart}`;
};

const BuyPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [goldPrice, setGoldPrice] = useState('');
	const [touch, setTouch] = useState('');
  const [weight, setWeight] = useState('');
  const [dirtWeight, setDirtWeight] = useState('');
  const [results, setResults] = useState(null);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(
      goldPrice !== '' && 
      goldPrice > 0 &&
      weight !== '' && 
      weight > 0
    );
  }, [goldPrice, weight]);

  const calculatePrice = () => {
    // Convert dirt weight from mg to g
    const dirtWeightInGrams = dirtWeight ? dirtWeight * 0.001 : 0;
    
    // Total weight in grams
    const totalWeight = parseFloat(weight) - dirtWeightInGrams;

		// Touch Multiplier
		const touchMultiplier = parseFloat(touch) / 100;
    
    // Calculate price without GST
    const goldCost = (goldPrice * touchMultiplier) * totalWeight;
    
    // Calculate price with GST
    const gstAmount = goldCost * GST_PERCENTAGE;
    const totalWithGST = goldCost + gstAmount;
    
    setResults({
      withoutGST: goldCost.toFixed(2),
      withGST: totalWithGST.toFixed(2),
      breakdown: {
        goldCost: goldCost.toFixed(2),
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
          Calculate Buying Price
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
            <NumericInput
              label="Touch"
              value={touch}
              onChange={setTouch}
              startAdornment="%"
              required
              allowDecimals={true}
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
              label="Dirt Weight (optional)"
              value={dirtWeight}
              onChange={setDirtWeight}
              endAdornment="mg"
              allowDecimals={false}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button 
              variant="contained" 
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
            <Grid item xs={12} sm={6}>
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
            
            <Grid item xs={12} sm={6}>
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

export default BuyPage;
