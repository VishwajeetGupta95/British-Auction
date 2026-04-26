// import { useState } from 'react';
// import { rfqService } from '../services/auctionService';
// import Card from '../components/common/Card';
// import Input from '../components/common/Input';
// import Button from '../components/common/Button';

// /**
//  * CreateRFQ Page
//  */
// export default function CreateRFQ() {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: '',
//     estimatedBudget: '',
//     deadline: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await rfqService.createRFQ(formData);
//       setSubmitted(true);
//       setFormData({
//         title: '',
//         description: '',
//         category: '',
//         estimatedBudget: '',
//         deadline: '',
//       });

//       // Reset success message after 3 seconds
//       setTimeout(() => setSubmitted(false), 3000);
//     } catch (error) {
//       console.error('Error creating RFQ:', error);
//       alert('Error creating RFQ. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="space-y-2">
//         <h1 className="text-4xl font-bold text-slate-100">Create RFQ</h1>
//         <p className="text-slate-400">
//           Request for Quote - Get bids from multiple sellers
//         </p>
//       </div>

//       {/* Success Message */}
//       {submitted && (
//         <div className="bg-green-900/30 border border-green-700 text-green-200 px-6 py-4 rounded-lg animate-fade-in">
//           RFQ created successfully!
//         </div>
//       )}

//       {/* Form */}
//       <Card className="max-w-2xl">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Title */}
//           <Input
//             label="Title"
//             name="title"
//             placeholder="Enter RFQ title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-2">
//               Description
//             </label>
//             <textarea
//               name="description"
//               placeholder="Describe what you're looking for"
//               value={formData.description}
//               onChange={handleChange}
//               rows="5"
//               className="input-field"
//               required
//             />
//           </div>


//           {/* Budget */}
//           <Input
//             label="Estimated Budget"
//             name="estimatedBudget"
//             type="number"
//             placeholder="Enter estimated budget"
//             value={formData.estimatedBudget}
//             onChange={handleChange}
//             required
//           />

//           {/* Deadline */}
//           <Input
//             label="Deadline"
//             name="deadline"
//             type="date"
//             value={formData.deadline}
//             onChange={handleChange}
//             required
//           />

//           {/* Submit Button */}
//           <div className="flex gap-4 pt-4">
//             <Button
//               variant="primary"
//               type="submit"
//               loading={loading}
//               disabled={loading}
//             >
//               Create RFQ
//             </Button>
//             <Button variant="secondary" type="reset">
//               Clear
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }
