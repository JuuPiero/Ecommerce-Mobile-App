import { Component } from 'react';
import { View, Text, Button } from 'react-native';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state để hiển thị fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Có thể gửi lỗi lên server tại đây
        console.error("Lỗi bắt được bởi ErrorBoundary:", error, errorInfo);
    }

    resetError = () => {
        this.setState({ hasError: false, error: null });
    }

    render() {
        if (this.state.hasError) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ fontSize: 18, color: 'red' }}>Có lỗi xảy ra khi tải trang.</Text>
                <Text selectable style={{ marginVertical: 10 }}>{this.state.error?.message}</Text>
                <Button title="Thử lại" onPress={this.resetError} />
            </View>
        );
        }

        return this.props.children;
    }
}