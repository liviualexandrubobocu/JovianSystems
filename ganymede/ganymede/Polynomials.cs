using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.LinearAlgebra.Double;
/// <summary>
/// Summary description for Polynomial
/// </summary>
public class Polynomial
{
    public Polynomial()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    # include <Eigen/Core>
# include <cmath>

namespace rpoly_plus_plus
{

    using Eigen::MatrixXd;
    using Eigen::VectorXd;
    using Eigen::VectorXcd;

    // Remove leading terms with zero coefficients.
    VectorXd RemoveLeadingZeros(const VectorXd& polynomial_in)
    {
        int i = 0;
        while (i < (polynomial_in.size() - 1) && polynomial_in(i) == 0)
        {
            ++i;
        }
        return polynomial_in.tail(polynomial_in.size() - i);
    }

    VectorXd DifferentiatePolynomial(const VectorXd& polynomial)
    {
        const int degree = polynomial.rows() - 1;

        // Degree zero polynomials are constants, and their derivative does
        // not result in a smaller degree polynomial, just a degree zero
        // polynomial with value zero.
        if (degree == 0)
        {
            return VectorXd::Zero(1);
        }

        VectorXd derivative(degree);
        for (int i = 0; i < degree; ++i)
        {
            derivative(i) = (degree - i) * polynomial(i);
        }

        return derivative;
    }

    VectorXd MultiplyPolynomials(const VectorXd& poly1, const VectorXd& poly2)
    {
        VectorXd multiplied_poly = VectorXd::Zero(poly1.size() + poly2.size() - 1); ;
        for (int i = 0; i < poly1.size(); i++)
        {
            for (int j = 0; j < poly2.size(); j++)
            {
                multiplied_poly.reverse()(i + j) +=
                    poly1.reverse()(i) * poly2.reverse()(j);
            }
        }
        return multiplied_poly;
    }

    VectorXd AddPolynomials(const VectorXd& poly1, const VectorXd& poly2)
    {
        if (poly1.size() > poly2.size())
        {
            VectorXd sum = poly1;
            sum.tail(poly2.size()) += poly2;
            return sum;
        }
        else
        {
            VectorXd sum = poly2;
            sum.tail(poly1.size()) += poly1;
            return sum;
        }
    }

    double FindRootIterativeNewton(const Eigen::VectorXd& polynomial,
                                   const double x0,
                                   const double epsilon,
                                   const int max_iterations)
    {
        double root = x0;
        const Eigen::VectorXd derivative = DifferentiatePolynomial(polynomial);
        double prev;
        for (int i = 0; i < max_iterations; i++)
        {
            prev = root;
            root -= EvaluatePolynomial(polynomial, root) /
                    EvaluatePolynomial(derivative, root);
            if (std::abs(prev - root) < epsilon)
            {
                break;
            }
        }
        return root;
    }

}  // namespace rpoly_plus_plus

#include <Eigen/Core>

namespace rpoly_plus_plus
{

    // All polynomials are assumed to be the form
    //
    //   sum_{i=0}^N polynomial(i) x^{N-i}.
    //
    // and are given by a vector of coefficients of size N + 1.

    // Remove leading terms with zero coefficients.
    Eigen::VectorXd RemoveLeadingZeros(const Eigen::VectorXd& polynomial_in);

    // Evaluate the polynomial at x using the Horner scheme.
    template<typename T>
    inline T EvaluatePolynomial(const Eigen::VectorXd& polynomial, const T& x)
    {
        T v = 0.0;
        for (int i = 0; i < polynomial.size(); ++i)
        {
            v = v * x + polynomial(i);
        }
        return v;
    }

    // Return the derivative of the given polynomial. It is assumed that
    // the input polynomial is at least of degree zero.
    Eigen::VectorXd DifferentiatePolynomial(const Eigen::VectorXd& polynomial);

    // Multiplies the two polynoimals together.
    Eigen::VectorXd MultiplyPolynomials(const Eigen::VectorXd& poly1,
                                        const Eigen::VectorXd& poly2);

    // Adds two polynomials together.
    Eigen::VectorXd AddPolynomials(const Eigen::VectorXd& poly1,
                                   const Eigen::VectorXd& poly2);

    // Find a root from the starting guess using Newton's method.
    double FindRootIterativeNewton(const Eigen::VectorXd& polynomial,
                                   const double x0,
                                   const double epsilon,
                                   const int max_iterations);

}  // namespace rpoly_plus_plus

#endif  // RPOLY_PLUS_PLUS_POLYNOMIAL_H_
}
