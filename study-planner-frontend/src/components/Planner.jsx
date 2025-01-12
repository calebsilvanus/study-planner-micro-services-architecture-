import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook
import './Planner.css';

const Planner = () => {
  const { logout, isAuthenticated, user, loading, loginWithRedirect } = useAuth0(); // Destructure necessary Auth0 functions and states

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = [
    '9.00 AM', '10.00 AM', '11.00 AM', '12.00 PM',
    '1.00 PM', '2.00 PM', '3.00 PM', '4.00 PM', '5.00 PM'
  ];

  // Load planner data and notes from localStorage if available
  const loadPlannerData = () => {
    const storedPlannerData = localStorage.getItem('plannerData');
    return storedPlannerData ? JSON.parse(storedPlannerData) : days.reduce((acc, day) => {
      acc[day] = times.reduce((timeAcc, time) => {
        timeAcc[time] = '';
        return timeAcc;
      }, {});
      return acc;
    }, {});
  };

  const loadNotes = () => {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : { note: '', homework: '', todo: '' };
  };

  const [plannerData, setPlannerData] = useState(loadPlannerData);
  const [notes, setNotes] = useState(loadNotes);

  // Persist plannerData and notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('plannerData', JSON.stringify(plannerData));
  }, [plannerData]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleInputChange = (day, time, value) => {
    setPlannerData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: value,
      },
    }));
  };

  const handleNoteChange = (field, value) => {
    setNotes((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Save planner data to backend (FastAPI)
      await axios.post('http://localhost:8000/save_planner', plannerData);
      await axios.post('http://localhost:8000/save_notes', notes);
      alert('Planner data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  const handleClear = () => {
    setPlannerData(
      days.reduce((acc, day) => {
        acc[day] = times.reduce((timeAcc, time) => {
          timeAcc[time] = '';
          return timeAcc;
        }, {});
        return acc;
      }, {})
    );
    setNotes({ note: '', homework: '', todo: '' });
    localStorage.removeItem('plannerData');
    localStorage.removeItem('notes');
  };

  // If loading, display a loading indicator
  if (loading) return <div>Loading...</div>;

  return (
    <Paper elevation={3} className="planner">
      <Box className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="study planner table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
              {days.map((day) => (
                <TableCell key={day} sx={{ fontWeight: 'bold' }}>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {times.map((time) => (
              <TableRow key={time}>
                <TableCell>{time}</TableCell>
                {days.map((day) => (
                  <TableCell key={`${day}-${time}`}>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={plannerData[day][time]}
                      onChange={(e) => handleInputChange(day, time, e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box className="notes-container">
        {['note', 'homework', 'todo'].map((field) => (
          <Box key={field} className="note-section">
            <TextField
              variant="outlined"
              multiline
              rows={4}
              value={notes[field]}
              onChange={(e) => handleNoteChange(field, e.target.value)}
              fullWidth
            />
          </Box>
        ))}
      </Box>
      <Box className="actions">
        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        <Button variant="outlined" color="secondary" onClick={handleClear}>Clear</Button>

        {/* Show login button if user is not authenticated */}
        {!isAuthenticated ? (
          <Button variant="outlined" color="secondary" onClick={() => loginWithRedirect()}>
            Log In
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default Planner;
