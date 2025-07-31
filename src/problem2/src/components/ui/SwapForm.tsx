import { ArrowUpDown, Wallet } from 'lucide-react';
import TokenDialog from './TokenDialog';
import { useTokenSelection } from '@/hooks/useTokenSelection';
import { useSwapForm } from '@/hooks/useSwapForm';
import LoadingSpinner from './LoadingSpinner';
import { DialogWrapper } from '../shadcn/dialog';
import { Button } from '../shadcn/button';
import TokenInput from './TokenInput';
import SwapSummary from './SwapSummary';

const SwapForm: React.FC = () => {
    const {
        selectedFromToken,
        selectedToToken,
        isFromDialogOpen,
        isToDialogOpen,
        setIsFromDialogOpen,
        setIsToDialogOpen,
        handleSelectFromToken,
        handleSelectToToken,
        handleSwitchTokens,
        isInitialized,
    } = useTokenSelection();

    const {
        fromAmount,
        errors,
        isLoading,
        register,
        handleSubmit,
        setValue,
        swapCalculation,
        handleMaxClick,
        executeSwap,
        getValidationRules,
    } = useSwapForm();

    // Handle form submission
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {
        await executeSwap(data);
    };

    // Handle token switching with form reset
    const handleSwitchTokensWithReset = () => {
        handleSwitchTokens();
        setValue('fromToken', selectedToToken?.symbol || '');
        setValue('toToken', selectedFromToken?.symbol || '');
        setValue('fromAmount', '');
        setValue('toAmount', '');
    };

    // Loading state while tokens are being loaded
    if (!isInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg">
                <div className="text-center">
                    <LoadingSpinner size="lg" className="mx-auto mb-4" />
                    <div className="text-lg font-semibold mb-2">Loading tokens...</div>
                    <div className="text-sm text-gray-500">Please wait while we load your available tokens.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg">
            <div className="max-w-md mx-auto p-4">
                {/* Header */}
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-3xl font-bold gradient-text">Swap App</h1>
                    <DialogWrapper
                        header={<span className="font-semibold text-xl">Your Balances</span>}
                        trigger={
                            <Button size="icon" className="bg-secondary rounded-lg hover:bg-secondary/70">
                                <Wallet className="w-10" />
                            </Button>
                        }
                    >
                        <TokenDialog onSelectToken={() => { }} variant="balance" />
                    </DialogWrapper>
                </div>

                {/* Main Swap Form */}
                <div className="rounded-2xl p-6 shadow-md bg-white">
                    {/* From Token Input */}
                    <TokenInput
                        label="From"
                        selectedToken={selectedFromToken}
                        amount={fromAmount}
                        onTokenSelect={handleSelectFromToken}
                        isDialogOpen={isFromDialogOpen}
                        onDialogToggle={setIsFromDialogOpen}
                        showBalance={true}
                        onMaxClick={handleMaxClick}
                        isInput={true}
                        errors={errors.fromAmount}
                        register={register('fromAmount', getValidationRules())}
                        disabled={isLoading}
                    />
                    {/* Switch Button */}
                    <div className="flex justify-center my-4">
                        <Button
                            type="button"
                            size="icon"
                            onClick={handleSwitchTokensWithReset}
                            disabled={!selectedFromToken || !selectedToToken || isLoading}
                            className="rounded-full hover:bg-secondary/70 transition-colors"
                        >
                            <ArrowUpDown className="w-5 h-5" />
                        </Button>
                    </div>
                    {/* To Token Input */}
                    <TokenInput
                        label="To"
                        selectedToken={selectedToToken}
                        amount={swapCalculation.toAmount}
                        onTokenSelect={handleSelectToToken}
                        isDialogOpen={isToDialogOpen}
                        onDialogToggle={setIsToDialogOpen}
                        showBalance={false}
                        isInput={false}
                        disabled={isLoading}
                    />
                    {/* Swap Summary */}
                    {swapCalculation.swapSummary && (
                        <SwapSummary
                            swapSummary={swapCalculation.swapSummary}
                            show={Boolean(fromAmount && swapCalculation.toAmount)}
                        />
                    )}
                    {/* Swap Button */}
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        disabled={
                            isLoading ||
                            !selectedFromToken ||
                            !selectedToToken ||
                            !fromAmount ||
                            !swapCalculation.toAmount ||
                            parseFloat(fromAmount) <= 0 ||
                            errors.fromAmount != null
                        }
                        className="w-full gradient-bg"
                        loading={isLoading}
                    >
                        {
                            !selectedFromToken || !selectedToToken ? 'Select tokens to swap' : 'Swap'
                        }
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SwapForm;
