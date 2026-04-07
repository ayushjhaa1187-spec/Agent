-- StockSense Seed Data
-- =====================
-- NOTE: This seed data assumes a user exists with the ID below.
-- Replace the user_id with an actual auth.users ID after signup.
-- You can find your user ID in the Supabase Auth dashboard.

-- For demo purposes, we'll use a placeholder UUID.
-- After creating your first user, update this and re-run.
DO $$
DECLARE
  demo_user_id UUID := '00000000-0000-0000-0000-000000000001';
BEGIN

-- Sample inventory items for a pharmacy
INSERT INTO inventory_items (user_id, name, batch_number, quantity, expiry_date, category, status, notes) VALUES
  (demo_user_id, 'Amoxicillin 500mg', 'AMX-2024-001', 150, '2026-08-15', 'antibiotics', 'active', 'Capsules, 500mg strength'),
  (demo_user_id, 'Ibuprofen 200mg', 'IBU-2024-045', 300, '2027-03-20', 'pain_relief', 'active', 'Tablets, OTC'),
  (demo_user_id, 'Metformin 850mg', 'MET-2023-112', 80, '2026-04-10', 'diabetes', 'expiring_soon', 'Extended release tablets'),
  (demo_user_id, 'Lisinopril 10mg', 'LIS-2024-023', 200, '2027-01-30', 'cardiovascular', 'active', 'Tablets for hypertension'),
  (demo_user_id, 'Omeprazole 20mg', 'OMP-2023-089', 45, '2026-02-28', 'gastrointestinal', 'expired', 'Delayed-release capsules'),
  (demo_user_id, 'Cetirizine 10mg', 'CET-2024-056', 500, '2027-06-15', 'allergy', 'active', 'Antihistamine tablets'),
  (demo_user_id, 'Azithromycin 250mg', 'AZI-2024-034', 12, '2026-05-20', 'antibiotics', 'expiring_soon', 'Z-Pack tablets'),
  (demo_user_id, 'Atorvastatin 20mg', 'ATV-2024-078', 180, '2027-09-10', 'cardiovascular', 'active', 'Cholesterol management'),
  (demo_user_id, 'Salbutamol Inhaler', 'SAL-2023-067', 25, '2026-03-01', 'respiratory', 'expired', '100mcg/dose metered dose inhaler'),
  (demo_user_id, 'Paracetamol 500mg', 'PAR-2024-099', 8, '2027-12-31', 'pain_relief', 'active', 'Low stock - reorder needed'),
  (demo_user_id, 'Ciprofloxacin 500mg', 'CIP-2024-015', 60, '2026-11-20', 'antibiotics', 'active', 'Film-coated tablets'),
  (demo_user_id, 'Losartan 50mg', 'LOS-2024-042', 140, '2027-04-15', 'cardiovascular', 'active', 'ARB for blood pressure');

-- Sample alerts
INSERT INTO alerts (user_id, item_id, alert_type, message, is_read) VALUES
  (demo_user_id, (SELECT id FROM inventory_items WHERE batch_number = 'MET-2023-112' LIMIT 1), 'expiry_warning', 'Metformin 850mg (Batch MET-2023-112) expires on 2026-04-10. Consider discounting or returning to supplier.', false),
  (demo_user_id, (SELECT id FROM inventory_items WHERE batch_number = 'OMP-2023-089' LIMIT 1), 'expired', 'Omeprazole 20mg (Batch OMP-2023-089) expired on 2026-02-28. Remove from active shelves immediately.', false),
  (demo_user_id, (SELECT id FROM inventory_items WHERE batch_number = 'SAL-2023-067' LIMIT 1), 'expired', 'Salbutamol Inhaler (Batch SAL-2023-067) expired on 2026-03-01. Dispose per pharmaceutical waste guidelines.', true),
  (demo_user_id, (SELECT id FROM inventory_items WHERE batch_number = 'PAR-2024-099' LIMIT 1), 'low_stock', 'Paracetamol 500mg is running low (8 units remaining). Reorder recommended.', false),
  (demo_user_id, (SELECT id FROM inventory_items WHERE batch_number = 'AZI-2024-034' LIMIT 1), 'expiry_warning', 'Azithromycin 250mg (Batch AZI-2024-034) expires on 2026-05-20. Only 12 units remaining.', false);

-- Sample chat history
INSERT INTO chat_history (user_id, messages, title) VALUES
  (demo_user_id, '[{"role":"user","content":"What medications are expiring soon?"},{"role":"assistant","content":"Based on your inventory, the following items are expiring soon:\n\n1. **Metformin 850mg** (Batch MET-2023-112) - Expires April 10, 2026\n2. **Azithromycin 250mg** (Batch AZI-2024-034) - Expires May 20, 2026\n\nI recommend reviewing these items for potential return to supplier or discounted sale before expiry."}]', 'Expiring medications check');

END $$;
