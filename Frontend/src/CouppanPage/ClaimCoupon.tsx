import React,{useState} from 'react';
import axios from 'axios';
import './ClaimCoupon.css';
import loginBackground2 from  '../../assets/loginBackground2.jpg'
function ClaimCoupon() {

    const [message, setMessage] = useState<string>('');
    const [coupon, setCoupon] = useState<string | null>(null);
    const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
    const [adminData, setAdminData] = useState({ email: '',password: ''});


    const claimCoupon = async () => { 
        try {
            const response = await axios.post('https://coupan.onrender.com/coupon/claim');
            setCoupon(response.data.coupon);
            setMessage(response.data.message);
        } catch (error: unknown) {
            console.error("Frontend Error:", error); // Log full error in the browser console
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.message || 'Error claiming coupon');
            } else {
                setMessage('An unknown error occurred');
            }
        }
    };
    async function AdminPanel() {
        console.log("Admin Login Clicked", adminData);
    
        try {
            
    
             await axios.post("https://coupan.onrender.com/auth/login", adminData, {
                withCredentials: true,  // Ensures cookies are sent
                headers: { "Content-Type": "application/json" },
            });
    
            alert("Login Successful!");
            window.location.href = "/admin"; // Redirect admin
        } catch (err) {
            
            alert(err instanceof Error ? err.message : "Something went wrong!");
        }
    }
  return (
    <div className="claim-container">
<img src={loginBackground2} alt='Background' className='BackgroundImage'/>
    <button onClick={claimCoupon} className='butt'>Claim Coupon</button>
    {message && <p className='para'>{message}</p>}

    {coupon && <h3 className='para'>Your Coupon: {coupon}</h3>}

    <button className='Admin' onClick={() => setShowAdminModal(true)}>Admin Login</button>

    {/* Admin Modal */}
    {showAdminModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Admin Login</h2>
                        <input  className='field'
                            type="email" 
                            placeholder="Email" 
                            value={adminData.email} 
                            onChange={(e) => setAdminData({...adminData, email: e.target.value})} 
                        />
                    
                        <input className='field'
                            type="password" 
                            placeholder="Password" 
                            value={adminData.password} 
                            onChange={(e) => setAdminData({...adminData, password: e.target.value})} 
                        />
                        <button onClick={AdminPanel}>Login</button>
                    </div>
                </div>
            )}
        
</div>

  )
}

export default ClaimCoupon