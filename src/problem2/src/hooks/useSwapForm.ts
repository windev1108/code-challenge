import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { Token, SwapFormData } from '../types/swap';
import { useBalanceStore } from '@/store/BalanceStore';
import toast from 'react-hot-toast';
import { sleep } from '@/lib/utils';



export const useSwapForm = () => {
    const { balances, updateBalance, selectedToken } = useBalanceStore();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<SwapFormData>({
        defaultValues: { fromAmount: '', toAmount: '' }
    });

    const fromAmount = watch('fromAmount');
    const toAmount = watch('toAmount');

    // Memoized swap calculation
    const swapCalculation = useMemo(() => {
        if (!fromAmount || !selectedToken.from || !selectedToken.to) {
            return { toAmount: '0', swapSummary: null };
        }

        const amount = parseFloat(fromAmount);
        if (isNaN(amount) || selectedToken.to.price <= 0) {
            return { toAmount: '0', swapSummary: null };
        }

        const convertedAmount = (amount * selectedToken.from.price) / selectedToken.to.price;
        const toAmountValue = convertedAmount.toFixed(6);

        // Calculate swap summary
        const fromAmountNum = amount;
        const toAmountNum = parseFloat(toAmountValue);
        const fromTokenBalance = selectedToken.from.balance ?? 0;
        const toTokenBalance = selectedToken.to.balance ?? 0;

        const swapSummary = {
            before: {
                fromToken: { ...selectedToken.from, balance: fromTokenBalance },
                toToken: { ...selectedToken.to, balance: toTokenBalance }
            },
            after: {
                fromToken: { ...selectedToken.from, balance: fromTokenBalance - fromAmountNum },
                toToken: { ...selectedToken.to, balance: toTokenBalance + toAmountNum }
            }
        };

        return { toAmount: toAmountValue, swapSummary };
    }, [fromAmount, selectedToken.from, selectedToken.to]);

    // Update toAmount when calculation changes
    const updateToAmount = useCallback(() => {
        setValue('toAmount', swapCalculation.toAmount);
    }, [swapCalculation.toAmount, setValue]);

    // Handle max click
    const handleMaxClick = useCallback(() => {
        if (selectedToken.from?.balance) {
            setValue('fromAmount', selectedToken.from.balance.toString());
        }
    }, [selectedToken.from, setValue]);

    // Execute swap
    const executeSwap = useCallback(async (data: SwapFormData) => {
        if (!selectedToken.from || !selectedToken.to) {
            toast.error('Please select both tokens');
            return false;
        }

        const fromSymbol = selectedToken.from.symbol;
        const toSymbol = selectedToken.to.symbol;
        const fromAmountNum = parseFloat(data.fromAmount);
        const toAmountNum = data.toAmount ? parseFloat(data.toAmount) : parseFloat(swapCalculation.toAmount)
        console.log('toAmountNum :', toAmountNum)
        // Get current balances
        const fromBalance = balances.find(t => t.symbol === fromSymbol)?.balance ?? 0;
        const toBalance = balances.find(t => t.symbol === toSymbol)?.balance ?? 0;

        // Validate balance
        if (fromBalance < fromAmountNum) {
            toast.error('Insufficient balance!');
            return false;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await sleep(2000);

            // Update balances
            const newFromBalance = Math.max(0, fromBalance - fromAmountNum);
            const newToBalance = toBalance + toAmountNum;

            updateBalance(fromSymbol, newFromBalance);
            updateBalance(toSymbol, newToBalance);

            // Reset form
            reset();

            toast.success('Swap executed successfully!');
            return true;
        } catch (error) {
            toast.error('Swap failed! Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [selectedToken.from, selectedToken.to, balances, swapCalculation, updateBalance, reset]);

    // Form validation rules
    const getValidationRules = useCallback(() => ({
        required: 'Amount is required',
        min: { value: 0.0000001, message: 'Amount must be positive' },
        max: {
            value: selectedToken.from?.balance ?? 0,
            message: 'Insufficient balance'
        },
        validate: (value: any) => {
            if (!value || value === '') return 'Amount is required';
            if (isNaN(Number(value))) return 'Amount must be a number';
            if (Number(value) <= 0) return 'Amount must be positive';
            return true;
        }
    }), [selectedToken.from?.balance]);

    return {
        // Form state
        fromAmount,
        toAmount,
        errors,
        isLoading,
        // Form methods
        register,
        handleSubmit,
        setValue,
        reset,

        // Calculations
        swapCalculation,
        updateToAmount,

        // Actions
        handleMaxClick,
        executeSwap,
        getValidationRules,
    };
}; 