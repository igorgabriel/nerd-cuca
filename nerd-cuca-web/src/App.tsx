import React, { useState, useEffect } from 'react';
import './App.css';
import nerdCuca from "./assets/nerd-cuca.webp"
import loadingGif from "./assets/loading.gif";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';


function App() {
  const [ingredients, setIngredients] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");

  const sendIngredients = async () => {
    try {
      setLoading(true)
      setAnswer("");
      const response = await fetch("http://localhost:3001/v1/recipes", {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*", // indicates which files we are able to understand
          "Content-Type": "application/json", // indicates what the server actually sent
        },
        body: JSON.stringify({ ingredients }), // server is expecting JSON
      });
      if (!response.ok || !response.body) {
        throw response.statusText;
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const loopRunner = true;

      while (loopRunner) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        setAnswer((answer) => answer + decodedChunk);
      }
    } catch (err) {
      console.error(err, "err");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="app">
      <Container fixed>
        <Card>
          <CardMedia
            sx={{ height: 400 }}
            image={nerdCuca}
            title="Nerd Cuca"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Olá, Nerd Cuca!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              O que você quer cozinhar hoje? Informe os ingredientes e eu crio uma receita bem legal para você!
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
              <div style={{ width: '50%' }}>
                <TextField
                  fullWidth
                  id="ingredients"
                  label="Ingredientes"
                  multiline
                  rows={4}
                  placeholder="Informe os ingredientes separados por vírgula"
                  variant="filled"
                  onChange={(e) => setIngredients(e.target.value)}
                />
                <div style={{marginTop: 10}}>
                  <Button size="medium" variant="contained" onClick={sendIngredients} style={{ marginRight: 20 }}>Criar receita</Button>
                  {loading && <img src={loadingGif} width={40} height={40} />}
                </div>
              </div>
              <div style={{ width: '45%' }}>
                {answer && <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Receita
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ whiteSpace: 'pre-line' }}>
                      {answer}
                    </Typography>
                  </CardContent>
                </Card>}
              </div>
            </div>

          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default App;
