import React, { useState } from "react";
import { Check, CreditCard, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface AppointmentDetails {
  id: string;
  date: Date;
  time: string;
  service: string;
  price: number;
  technician: string;
  address: string;
}

interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface AppointmentConfirmationProps {
  appointment?: AppointmentDetails;
  onConfirm?: (paymentDetails: PaymentDetails) => void;
  onCancel?: () => void;
  isOpen?: boolean;
}

const AppointmentConfirmation = ({
  appointment = {
    id: "APT-1234",
    date: new Date(),
    time: "10:00 AM - 12:00 PM",
    service: "AC Installation",
    price: 299.99,
    technician: "John Smith",
    address: "123 Main St, Anytown, USA",
  },
  onConfirm = () => {},
  onCancel = () => {},
  isOpen = true,
}: AppointmentConfirmationProps) => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
      onConfirm(paymentDetails);
    }, 1500);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isConfirmed
              ? "Appointment Confirmed!"
              : "Confirm Your Appointment"}
          </DialogTitle>
          <DialogDescription>
            {isConfirmed
              ? "Your appointment has been successfully scheduled. You will receive a confirmation email shortly."
              : "Please review your appointment details and complete payment to confirm."}
          </DialogDescription>
        </DialogHeader>

        {isConfirmed ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              Booking Reference: {appointment.id}
            </h3>
            <p className="text-gray-500 mb-6">
              A confirmation has been sent to your email
            </p>

            <Card className="w-full">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <span>Date</span>
                    </div>
                    <span className="font-medium">
                      {format(appointment.date, "MMMM d, yyyy")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span>Time</span>
                    </div>
                    <span className="font-medium">{appointment.time}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span>Service</span>
                    <span className="font-medium">{appointment.service}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Technician</span>
                    <span className="font-medium">
                      {appointment.technician}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Address</span>
                    <span className="font-medium">{appointment.address}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span>Total Paid</span>
                    <span className="font-bold">
                      ${appointment.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Appointment Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>{format(appointment.date, "MMMM d, yyyy")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Time</p>
                  <p>{appointment.time}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Service</p>
                  <p>{appointment.service}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Technician
                  </p>
                  <p>{appointment.technician}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p>{appointment.address}</p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <p className="font-medium">Total</p>
                <p className="text-lg font-bold">
                  ${appointment.price.toFixed(2)}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment Information</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentDetails.cardNumber}
                      onChange={handleInputChange}
                    />
                    <CreditCard className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    placeholder="John Smith"
                    value={paymentDetails.cardName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={paymentDetails.expiryDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      type="password"
                      value={paymentDetails.cvv}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {isConfirmed ? (
            <Button onClick={onCancel}>Close</Button>
          ) : (
            <div className="flex w-full flex-col-reverse sm:flex-row sm:justify-between gap-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="min-w-[120px]"
              >
                {isProcessing
                  ? "Processing..."
                  : `Pay $${appointment.price.toFixed(2)}`}
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentConfirmation;
