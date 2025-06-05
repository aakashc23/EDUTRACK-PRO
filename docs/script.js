
// Register Form
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const btn = e.target.querySelector('button');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';

  try {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('http://localhost:3001/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    alert(JSON.stringify(result));
    
    if (result.success) {
      e.target.reset();
    }
  } catch (err) {
    alert('⚠️ Network error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-save"></i> Register Student';
  }
});

// Attendance Form
document.getElementById('attendanceForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const btn = e.target.querySelector('button');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

  try {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('http://localhost:3001/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    alert(JSON.stringify(result));
    
    if (result.success) {
      e.target.reset();
    }
  } catch (err) {
    alert('⚠️ Network error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-save"></i> Submit Attendance';
  }
});

// Performance Form
document.getElementById('performanceForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const btn = e.target.querySelector('button');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

  try {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('http://localhost:3001/api/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    alert(JSON.stringify(result));
    
    if (result.success) {
      e.target.reset();
    }
  } catch (err) {
    alert('⚠️ Network error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-save"></i> Save Performance';
  }
});